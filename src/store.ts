import {createStore, applyMiddleware, Store, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';
import RootReducers from './reducers';
import RootEpics from './epics';

export const cfgStore = (): Store => {
  const initialState = {};
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    RootReducers,
    initialState,
    compose(applyMiddleware(epicMiddleware, thunk)),
  );
  // @ts-ignore
  epicMiddleware.run(RootEpics);
  return store;
};
