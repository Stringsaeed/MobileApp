import HelpApi from '@services/http';
import AsyncStorage from '@react-native-community/async-storage';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

export const initialApp: () => ThunkAction<any, any, any, any> = () => async (
  dispatch: ThunkDispatch<any, any, any>,
): Promise<void> => {
  try {
    dispatch({
      type: '@INIT_APP/LOADING',
    });
    const item = await AsyncStorage.getItem('@USER_LOGIN');
    if (item) {
      const user = JSON.parse(item);
      HelpApi.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${user.token}`;
          return config;
        },
        () => {},
      );
      const response = await HelpApi.get('/posts/types');
      console.log(response);
      dispatch({
        type: '@POST_UTILS/ADD_TYPES',
        payload: response.data.data,
      });
      dispatch({
        type: '@LOGIN/USER',
        payload: user,
      });
      dispatch({
        type: '@INIT_APP/DONE',
      });
    }
  } catch (e) {
    console.log(e.response || e);
    dispatch({
      type: '@INIT_APP/DONE',
    });
  }
};
