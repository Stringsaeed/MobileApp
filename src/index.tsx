import {Store} from 'redux';
import * as React from 'react';
import {cfgStore} from '@store';
import {Provider} from 'react-redux';
import {NavigatedApp} from '@routers';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const store: Store = cfgStore();

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigatedApp />
      </Provider>
    </SafeAreaProvider>
  );
};
