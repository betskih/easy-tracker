import { spawn, take, fork } from 'redux-saga/effects';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-fetch';
import { REHYDRATE } from 'redux-persist/lib/constants';
// import config from 'react-native-config';

// TODO: use fetchDriver to force api call timeout

import { onRequest, onSuccess, onError } from './interceptors';
import { appSaga } from './saga';

const driver = createDriver(fetch, {
  baseURL: 'https://ya.ru',
});

export function* rootSaga() {
  yield take(REHYDRATE);
  const conf = {
    driver,
    onRequest,
    onSuccess,
    onError,
  };
  yield createRequestInstance(conf);
  yield fork(watchRequests);
  yield spawn(appSaga);
}
