import HelpApi from '@services/http';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

export const getPostTypes: () => ThunkAction<any, any, any, any> = () => async (
  dispatch: ThunkDispatch<any, any, any>,
): Promise<void> => {
  try {
    const response = await HelpApi.get('/posts/types');
    console.log(response);
    dispatch({
      type: '@POST_UTILS/ADD_TYPES',
      payload: response.data.data,
    });
  } catch (e) {}
};
