import _ from 'lodash';
import {HomeStore} from '@interfaces';
import {ActionType} from '@interfaces';

const initialState: HomeStore = {
  data: [],
  isLoading: true,
  isRefreshing: false,
  isUpdating: false,
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case '@HOME/UPDATING':
      return {
        ...state,
        isUpdating: true,
      };
    case '@HOME/LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case '@HOME/REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case '@HOME/SUCCESS':
      if (action.payload && action.payload instanceof Array) {
        if (state.isRefreshing || state.isLoading) {
          return {
            ...state,
            isUpdating: false,
            isLoading: false,
            isRefreshing: false,
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
    case '@HOME/ERROR':
      return {
        ...state,
        isUpdating: false,
        isLoading: false,
        isRefreshing: false,
      };
    default:
      return state;
  }
};
