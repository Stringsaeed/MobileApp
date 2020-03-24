import HelpApi from '@services/http';
import AsyncStorage from '@react-native-community/async-storage';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {BackHandler, Platform} from 'react-native';
import Messaging from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';
import Crashlytics from '@react-native-firebase/crashlytics';
import {getPostTypes} from './postUtils';

const checkPermissionIos = async () => {
  if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log(result);
    switch (result) {
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  }
  return;
};

const checkPermissionAndroid = async () => {
  if (Platform.OS === 'android') {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        BackHandler.exitApp();
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        BackHandler.exitApp();
        break;
    }
  }
  return;
};

export const initialApp: () => ThunkAction<any, any, any, any> = () => async (
  dispatch: ThunkDispatch<any, any, any>,
): Promise<void> => {
  try {
    dispatch({
      type: '@INIT_APP/LOADING',
    });
    const item = await AsyncStorage.getItem('@USER_LOGIN');

    if (Platform.OS === 'android') {
      await checkPermissionAndroid();
    } else if (Platform.OS === 'ios') {
      await checkPermissionIos();
    } else {
      Crashlytics().log('Platform is not native');
    }

    if (item) {
      const user = JSON.parse(item);
      HelpApi.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${user.token}`;
          return config;
        },
        () => {},
      );
      Messaging()
        .getToken()
        .then(token => {
          HelpApi.post('/users/devices', {
            device_type: Platform.OS,
            fcm_token: token,
            device_id: getUniqueId(),
          });
        });
      dispatch(getPostTypes());
      dispatch({
        type: '@LOGIN/USER',
        payload: user,
      });
    }
    dispatch({
      type: '@INIT_APP/DONE',
    });
  } catch (e) {
    console.log(e.response || e);
    Crashlytics().recordError(e);
    dispatch({
      type: '@INIT_APP/DONE',
    });
  }
};
