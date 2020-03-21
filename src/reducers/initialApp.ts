import {ActionType, InitialApp} from '@interfaces';

const initialState: InitialApp = {
  isLoading: true,
};

export default (state = initialState, action: ActionType) => {
  if (action.type === '@INIT_APP/LOADING') {
    return {...state, isLoading: true};
  } else if (action.type === '@INIT_APP/DONE') {
    return {...state, isLoading: false};
  } else {
    return state;
  }
};
