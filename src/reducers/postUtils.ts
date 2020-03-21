import {ActionType, PostUtilsStore} from '@interfaces';

const initialState: PostUtilsStore = {
  types: [],
};

export default (state = initialState, action: ActionType) => {
  if (action.type === '@POST_UTILS/ADD_TYPES') {
    return {...state, types: action.payload};
  } else {
    return state;
  }
};
