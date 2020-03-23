import * as React from 'react';
import {useEffect} from 'react';
// @ts-ignore
import {initialApp} from '@actions';
import {ThemeProvider} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {InitialApp, ReduxState, ThemeManager, UserStore} from '@interfaces';

import Root from './root';
import AuthStack from './authStack';
import SplashStack from './splashScreen';

const getActiveRouteName = (state: any): string => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
});
messaging().subscribeToTopic('general');
messaging().subscribeToTopic('all_android');
if (__DEV__) {
  messaging().subscribeToTopic('debug');
}
export const NavigatedApp = ({}) => {
  const routeNameRef = React.useRef('');
  const navigationRef = React.useRef<any>();

  React.useEffect(() => {
    const state = navigationRef.current && navigationRef.current.getRootState();
    if (state) {
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
        {isLoading ? <SplashStack /> : token ? <Root /> : <AuthStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
};
