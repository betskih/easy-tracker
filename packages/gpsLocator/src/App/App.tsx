import React, { FunctionComponent } from 'react';
import { BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { back, canGoBack } from 'redux-first-router';
import FirstNavigator from '../navigation/FirstNavigator';
import { configureStore } from './configure-store';
import { requestLocationPermission } from './geo';

const { store, persistor } = configureStore();
requestLocationPermission();

BackHandler.addEventListener('hardwareBackPress', () => {
  if (canGoBack()) {
    back();
    return true;
  }
  return false;
});

const App: FunctionComponent<{}> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirstNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
