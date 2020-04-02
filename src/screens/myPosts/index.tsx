import * as React from 'react';
import {Screen} from '@components';
import {PostComponent} from '@components/newPost';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '@theme';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import {useCallback, useEffect, useReducer} from 'react';
import HelpApi from '@services/http';
import {Post} from '@interfaces/post';
import _ from 'lodash';
import Geolocation from '@react-native-community/geolocation';

type Props = {};

interface StateType {
  isLoading: boolean;
  isRefreshing: boolean;
  isUpdating: boolean;
  data: Post[] | [];
  per_page: number;
  page: number;
}

interface ActionType {
  type: 'UPDATING' | 'LOADING' | 'REFRESHING' | 'DONE';
  payload?: Post[] | [];
  meta: {
    page: number;
    per_page: number;
  };
}

type ReducerType = (state: StateType, action: ActionType) => StateType;

const MyPostsReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isRefreshing: false,
        isUpdating: false,
        isLoading: true,
      };
    case 'REFRESHING':
      return {
        ...state,
        isRefreshing: true,
        isUpdating: false,
        isLoading: false,
      };
    case 'UPDATING':
      return {
        ...state,
        isRefreshing: false,
        isUpdating: true,
        isLoading: false,
      };
    case 'DONE':
      if (action.payload) {
        if (state.isRefreshing || state.isLoading) {
          return {
            ...state,
            isUpdating: false,
            isLoading: false,
            isRefreshing: false,
            page: action.meta && action.meta.page && action.meta.page,
            data: [...action.payload],
          };
        } else {
          return {
            ...state,
            isUpdating: false,
            isLoading: false,
            isRefreshing: false,
            data: _.uniqBy([...state.data, ...action.payload], 'id'),
          };
        }
      }
      return state;
    default:
      return state;
  }
};

export function MyPostsScreen() {
  const [state, dispatch] = useReducer<ReducerType>(MyPostsReducer, {
    isUpdating: false,
    isRefreshing: false,
    data: [],
    isLoading: true,
    per_page: 10,
    page: 1,
  });
  const {top} = useSafeArea();
  const theme = useTheme();

  const getMyPosts = useCallback(async (type, page = 1, per_page = 10) => {
    dispatch({
      type,
      meta: {
        page,
        per_page,
      },
    });
    Geolocation.getCurrentPosition(
      async res => {
        try {
          const response = await HelpApi.get(
            `/posts?per_page=${per_page}&page=${page}&latitude=${
              res.coords.latitude
            }&longitude=${res.coords.longitude}&own=true`,
          );
          console.log(res, response);
          dispatch({
            type: 'DONE',
            payload: response.data.data,
            meta: {
              page,
              per_page,
            },
          });
        } catch (e) {
          console.log(e.response || e);
        }
      },
      error => {
        console.log(error);
      },
      {
        timeout: 300,
      },
    );
  }, []);

  useEffect(() => {
    getMyPosts('LOADING');
  }, [getMyPosts]);

  const renderPost = ({item}: {item: Post}) => {
    return <PostComponent item={item} />;
  };

  return (
    <Screen
      type="static"
      contentContainerStyle={{flex: 1}}
      style={{paddingTop: theme.spacing.medium}}>
      {state.isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={theme.colors.text} />
        </View>
      ) : (
        <FlatList
          data={state.data}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              onRefresh={() => {
                getMyPosts('REFRESHING');
              }}
              refreshing={state.isRefreshing}
              size={theme.spacing.large}
            />
          }
          onEndReached={() => {
            if (state.data.length >= 10) {
              getMyPosts('UPDATING', state.page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </Screen>
  );
}
