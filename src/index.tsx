import {Store} from 'redux';
import * as React from 'react';
import {cfgStore} from '@store';
import {Provider} from 'react-redux';
import {NavigatedApp} from '@routers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
const store: Store = cfgStore();

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <NavigatedApp />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
