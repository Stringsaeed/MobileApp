import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore, Store} from 'redux';

import RootReducers from './reducers';

export const cfgStore = (): Store => {
  const initialState = {};
  return createStore(
    RootReducers,
    initialState,
    compose(applyMiddleware(thunk)),
  );
};
