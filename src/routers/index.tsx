import * as React from 'react';
import {useEffect} from 'react';
import {initialApp} from '@actions';
import {ThemeProvider} from '@theme';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {InitialApp, ReduxState, ThemeManager, UserStore} from '@interfaces';
import messaging from '@react-native-firebase/messaging';
import Tabs from './tabs';
import AuthStack from './authStack';
import SplashStack from './splashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {PostScreen} from '@screens';
import {Post} from '@interfaces/post';

const getActiveRouteName = (state: any): string => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

const RootStack = createStackNavigator<{
  '@POST_SCREEN': {item: Post};
  '@TABS': {};
}>();

export const NavigatedApp = ({}) => {
  const routeNameRef = React.useRef('');
  const navigationRef = React.useRef<any>();

  React.useEffect(() => {
    return messaging().onMessage(message => console.log('1', message));
  }, []);
  React.useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().subscribeToTopic('general');
    messaging().subscribeToTopic('all_android');
    const state = navigationRef.current && navigationRef.current.getRootState();
    if (state) {
      // Save the initial route name
      routeNameRef.current = getActiveRouteName(state);
    }
  }, []);

  const dispatch = useDispatch();
  const {token} = useSelector<ReduxState, UserStore>(state => state.user);
  const {theme} = useSelector<ReduxState, ThemeManager>(
    state => state.themeManager,
  );
  const {isLoading} = useSelector<ReduxState, InitialApp>(
    state => state.initialApp,
  );

  useEffect(() => {
    dispatch(initialApp());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);

          if (previousRouteName !== currentRouteName) {
            analytics().setCurrentScreen(currentRouteName, currentRouteName);
          }
          routeNameRef.current = currentRouteName;
        }}
        theme={theme}>
        {isLoading ? (
          <SplashStack />
        ) : token ? (
          <RootStack.Navigator>
            <RootStack.Screen
              name="@TABS"
              component={Tabs}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="@POST_SCREEN"
              component={PostScreen}
              options={({route}) => ({
                title: `${route.params.item.user &&
                  route.params.item.user.name} in ${
                  route.params.item.type.name
                }`,
                headerTitleStyle: {
                  fontFamily: theme.fonts.bold.fontFamily,
                },
                headerTransparent: true,
              })}
            />
          </RootStack.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
};
