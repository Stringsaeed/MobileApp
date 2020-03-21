import {combineEpics} from 'redux-observable';
import {getPosts$} from './postsEpic';

export default combineEpics(getPosts$);
