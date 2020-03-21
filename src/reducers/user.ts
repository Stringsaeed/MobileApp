import {UserStore} from '@interfaces';
import {ActionType} from '@interfaces';

const initialState: UserStore = {
  id: '',
  name: '',
  token: '',
  email: '',
  phone: '',
};

export default (state: UserStore = initialState, action: ActionType) => {
  switch (action.type) {
    case '@LOGIN/USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
