import {HomeStore, PostUtilsStore, ThemeManager, UserStore} from './reduxState';

export interface ActionType {
  type:
    | '@LOGIN/USER'
    | '@THEME/TOGGLE_DARK'
    | '@THEME/TOGGLE_LIGHT'
    | '@INIT_APP/LOADING'
    | '@INIT_APP/DONE'
    | '@HOME/SUCCESS'
    | '@HOME/ERROR'
    | '@HOME/UPDATING'
    | '@HOME/REFRESHING'
    | '@HOME/LOADING'
    | '@LOGOUT/USER'
    | '@POST_UTILS/ADD_TYPES';
  payload?: UserStore | ThemeManager | PostUtilsStore | HomeStore['data'];
}
