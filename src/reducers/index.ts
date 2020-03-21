import {combineReducers} from 'redux';
import home from './home';
import user from './user';
import postUtils from './postUtils';
import initialApp from './initialApp';
import themeManager from './themeManager';

export default combineReducers({
  user,
  home,
  postUtils,
  initialApp,
  themeManager,
});
