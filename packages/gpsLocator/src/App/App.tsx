import React, { FunctionComponent, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// @ts-ignore
import BackgroundJob from 'react-native-background-job';
import gpsWorker from '../utilities/gpsWorker';
import { RootRouter } from '../navigation/RootRouter';
import { changeAppState } from '../services/geo/actions';
import { configureStore } from './configure-store';
import { requestLocationPermission } from './geo';



const { store, persistor } = configureStore();

requestLocationPermission();

const App: FunctionComponent<{}> = () => {
  const appState = useRef('background');

  useEffect(() => {
    const backgroundJob = {
      jobKey: 'gpsWorker',
      job: gpsWorker.proceedTracking,
    };
    BackgroundJob.register(backgroundJob);
  }, []);

  useEffect(() => {
    const handleAppState = (nextAppState: AppStateStatus) => {
      if (appState.current !== 'active' && nextAppState === 'active') {
        store.dispatch(changeAppState('active'));
      } else {
        if (appState.current === 'active') {
          store.dispatch(changeAppState('background'));
        }
      }
      appState.current = nextAppState;
    };
    AppState.addEventListener('change', handleAppState);
    return () => {
      AppState.removeEventListener('change', handleAppState);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootRouter />
      </PersistGate>
    </Provider>
  );
};
export default App;
