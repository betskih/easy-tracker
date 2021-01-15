import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import { AppContainer } from '../sceenes/MainScreen/AppContainer';
import { ErrorBoundary } from './ErrorBoundary';
import { configureStore } from './store-config';

export const App: FunctionComponent<{}> = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={configureStore()}>
          <AppContainer />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);
