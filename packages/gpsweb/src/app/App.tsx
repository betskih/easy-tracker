import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'antd/dist/antd.css';

import { AppContainer } from '../sceenes/MainScreen/AppContainer';
import { ErrorBoundary } from './ErrorBoundary';
import { configureStore } from './store-config';
import { fbConfig } from './root-reducer';

export const App: FunctionComponent<{}> = () => {
  const { store, persistor } = configureStore();
  try {
    firebase.initializeApp(fbConfig);
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      throw err;
    }
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);
