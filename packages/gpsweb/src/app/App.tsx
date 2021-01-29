import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'antd/dist/antd.css';

import { FirebaseAuthProvider } from '@react-firebase/auth';
import { AppContainer } from '../sceenes/MainScreen/AppContainer';
import { ErrorBoundary } from './ErrorBoundary';
import { configureStore } from './store-config';
import { fbConfig } from './root-reducer';

export const App: FunctionComponent<{}> = () => {
  const store = configureStore();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <FirebaseAuthProvider firebase={firebase} {...fbConfig}>
            <AppContainer />
          </FirebaseAuthProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);
