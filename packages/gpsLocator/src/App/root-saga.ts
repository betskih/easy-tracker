import { spawn, take, fork } from 'redux-saga/effects';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-fetch';
import { REHYDRATE } from 'redux-persist/lib/constants';
// import config from 'react-native-config';

// TODO: use fetchDriver to force api call timeout

import { getApiURL } from '../utilities/config';
import { onRequest, onSuccess, onError } from './interceptors';
import { appSaga } from './saga';

export function* rootSaga() {
  yield take(REHYDRATE);
  yield createRequestInstance({
    driver: createDriver(fetch, {
      baseURL: getApiURL(),
    }),
    onRequest,
    onSuccess,
    onError,
  });
  yield fork(watchRequests);
  yield spawn(appSaga);
}
