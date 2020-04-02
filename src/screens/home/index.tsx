import * as React from 'react';
import {useTheme} from '@theme';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import Color from 'color';
import {Screen} from '@components';
import {PostComponent} from '@components/newPost';
import {HomeStore, ParamsList, ReduxState} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {getHome} from '@actions';
import {Post} from '@interfaces/post';
import {Snackbar} from 'react-native-paper';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import HomeEmpty from '@theme/illustrations/undraw_body_text_l3ld.svg';
import {StackNavigationProp} from '@react-navigation/stack';

interface HomeProps {
  navigation: StackNavigationProp<ParamsList>;
}

export const HomeScreen = ({navigation}: HomeProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<any>({
    data: {
      body: '',
    },
  });
  const [page, setPage] = useState<number>(1);
  const [offerHelp, setOfferHelp] = useState<boolean>(true);
  const [type_id, setType_id] = useState<string>('');
  const [type, setType] = useState<'LOADING' | 'REFRESHING' | 'UPDATING'>(
    'LOADING',
  );

  const getNotification = async () => {
    const notification = await messaging().getInitialNotification();
    if (notification) {
      // @ts-ignore
      setMessage(notification);
      setVisible(true);
    }
  };
  React.useEffect(() => {
    getNotification();
    messaging().getInitialNotification();
    messaging().onNotificationOpenedApp(
      (_message: FirebaseMessagingTypes.RemoteMessage) => {
        // @ts-ignore
        setMessage(_message);
        setVisible(true);
      },
    );
    messaging().onMessage(_message => {
      // @ts-ignore
      setMessage(_message);
      setVisible(true);
    });
  }, []);

  const theme = useTheme();

  const statusBarColor = useMemo(
    () => Color(theme.colors.primary).darken(0.5),
    [theme.colors.primary],
  );

  const dispatch = useDispatch();
  const {isLoading, isRefreshing, data} = useSelector<ReduxState, HomeStore>(
    state => state.home,
  );

  const getData = useCallback(() => {
    dispatch(getHome(type, page, 10, offerHelp, type_id));
  }, [type, dispatch, offerHelp, page, type_id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const renderPost = ({item}: {item: Post}) => {
    return (
      <PostComponent
        item={item}
        onPress={() => {
          navigation.push('@POST_SCREEN', {
            item: item,
          });
        }}
      />
    );
  };

  return (
    <>
      <Screen
        type="static"
        contentContainerStyle={{flex: 1}}
        style={{paddingTop: theme.spacing.small}}>
        <StatusBar
          animated
          backgroundColor={statusBarColor.toString()}
          translucent
          showHideTransition="slide"
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
        />
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : (
          <>
            <FlatList
              data={data}
              renderItem={renderPost}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  colors={[theme.colors.primary]}
                  onRefresh={() => {
                    setType('REFRESHING');
                  }}
                  refreshing={isRefreshing}
                  size={theme.spacing.large}
                />
              }
              contentContainerStyle={
                data.length
                  ? {}
                  : {flex: 1, justifyContent: 'center', alignItems: 'center'}
              }
              ListEmptyComponent={
                <HomeEmpty
                  width={300}
                  height={300}
                  // fill={theme.colors.background}
                  // fillRule="nonzero"
                  style={{flex: 1, alignSelf: 'center'}}
                />
              }
              onEndReached={() => {
                if (data.length >= 10) {
                  setPage(page + 1);
                  setType('UPDATING');
                }
              }}
              onEndReachedThreshold={0.5}
              // contentContainerStyle={{flex: 1}}
            />
          </>
        )}
      </Screen>
      <Snackbar
        theme={{dark: theme.dark, colors: {accent: theme.colors.primary}}}
        action={{
          label: 'view',
          onPress: () => {
            // @ts-ignore
            navigation.navigate('@POST_SCREEN', {
              item: {
                id: message.data.post_id,
              },
            });
          },
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        {message.data && message.data.body}
      </Snackbar>
    </>
  );
};
