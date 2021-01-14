import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootRouter } from '../navigation/RootRouter';
import { configureStore } from './configure-store';
import { requestLocationPermission } from './geo';

const { store, persistor } = configureStore();

requestLocationPermission();

const App: FunctionComponent<{}> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootRouter />
      </PersistGate>
    </Provider>
  );
};
export default App;
