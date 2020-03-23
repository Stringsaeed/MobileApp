import * as React from 'react';
import {useTheme} from '@theme';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import {Header, PostComponent, Screen} from '@components';
import {useSafeArea} from 'react-native-safe-area-context';
import {ActionType, HomeStore, ParamsList, ReduxState} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {getHome} from '@actions';
import {Post} from '@interfaces/post';
import {Snackbar} from 'react-native-paper';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

interface HomeProps {
  navigation: BottomTabNavigationProp<ParamsList>;
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
    return messaging().onMessage(_message => {
      // @ts-ignore
      setMessage(_message);
      setVisible(true);
    });
  }, []);

  const theme = useTheme();
  const {top} = useSafeArea();
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
        container={{
          padding: 5,
        }}
      />
    );
  };

  return (
    <>
      <Screen
        type="static"
        contentContainerStyle={{flex: 1}}
        style={{paddingTop: top + theme.spacing.medium}}>
        <StatusBar
          animated
          backgroundColor={theme.colors.background}
          translucent
          showHideTransition="slide"
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
        />
        <Header>
          <Header.Button
            icon="settings"
            size={24}
            color={theme.colors.text}
            onPress={() =>
              dispatch<ActionType>({
                type: theme.dark ? '@THEME/TOGGLE_LIGHT' : '@THEME/TOGGLE_DARK',
              })
            }
          />
        </Header>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
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

// <PostComponent
//             container={{
//               padding: 5,
//             }}
//             item={{
//               id: 's',
//               title: 'Hi',
//               body: 'I need Help!',
//               comment: [],
//               created_at: 9213123,
//               type: {
//                 id: '1',
//                 name: 'general',
//               },
//             }}
//           />
//           <PostComponent
//             container={{
//               padding: 5,
//             }}
//             item={{
//               id: 's',
//               title: 'Anyone can get me water?',
//               body:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet nunc.\n' +
//                 'Nullam nec convallis augue, ut auctor nunc. Integer blandit tincidunt dui vestibulum efficitur.\n' +
//                 'Vestibulum lobortis feugiat purus eget interdum. \n' +
//                 'Proin rhoncus volutpat turpis, eu tempus quam interdum ut. \n' +
//                 'Vestibulum id faucibus sem. Donec iaculis orci vel nisl dapibus porttitor. \n Fusce sed orci non erat venenatis dapibus. Pellentesque quis pellentesque quam, eu interdum augue.\n' +
//                 'Proin dictum hendrerit ipsum non ultricies. Quisque at tortor velit. Praesent eleifend, \n' +
//                 'metus sed accumsan interdum,\n nisi neque tristique arcu, vitae blandit odio odio eget est. \n' +
//                 'Fusce sit amet neque ullamcorper, placerat nibh sed, convallis leo. Nulla venenatis ex a volutpat accumsan. Maecenas ut turpis non ex mollis facilisis. Pellentesque malesuada odio fermentum dignissim mollis. Morbi in pretium lorem. Phasellus consequat ullamcorper quam id posuere. Fusce ullamcorper molestie lacus, nec condimentum nibh bibendum vitae.',
//               comment: [],
//               created_at: 9213123,
//               type: {
//                 id: '1',
//                 name: 'general',
//               },
//             }}
//           />
