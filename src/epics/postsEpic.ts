import {filter} from 'rxjs/operators';
import {ActionsObservable} from 'redux-observable';
import {isOfType} from 'typesafe-actions';

export const getPosts$ = (action$: ActionsObservable<any>) =>
  action$.pipe(filter(isOfType('@POST/GET')));
