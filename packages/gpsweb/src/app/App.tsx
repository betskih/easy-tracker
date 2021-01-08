import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { MainScreen } from '../sceenes/MainScreen/MainScreen';
import { ErrorBoundary } from './ErrorBoundary';
import { configureStore } from './store-config';

interface IApp {}

export const App: FunctionComponent<IApp> = () => {
  return (
    <ErrorBoundary>
      <Provider store={configureStore()}>
        <MainScreen />
      </Provider>
    </ErrorBoundary>
  );
};

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);
