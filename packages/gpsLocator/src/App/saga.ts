import { takeEvery, select, put, fork, delay } from 'redux-saga/effects';

import { getUniqueId } from 'react-native-device-info';
import { error, success } from 'redux-saga-requests';
import { Actions } from 'react-native-router-flux';
import { getFirstArray, getGeoPending } from '../services/geo/selector';
import { sendGeoData, SET_NEW_PASSWORD } from '../services/geo/actions';
import { fetchAuthTokens, fetchGeoId, REFRESH_TOKENS, setAppState, setDeviceInfo } from './actions';
import {
  appStatusSelector,
  getDeviceIdSelector,
  getGeoIdSelector,
  getUserIdSelector,
  isAuthorizedSelector,
} from './selectors';
import { APP_STATUS } from './types';

export const BACKEND_CHECK_INTERVAL = 15 * 1000;

export function* initializeApp() {
  const uid = getUniqueId();
  yield put(setDeviceInfo({ uid }));
  yield put(setAppState(APP_STATUS.INITIALIZED));
}

function* backendEventLoop() {
  while (true) {
    const isAuthenticated = yield select(isAuthorizedSelector);
    const appState = yield select(appStatusSelector);
    if (!isAuthenticated && appState === APP_STATUS.INITIALIZED) {
      const deviceId = yield select(getDeviceIdSelector);
      yield put(fetchAuthTokens(deviceId));
    }
    const geoId = yield select(getGeoIdSelector);
    const userId = yield select(getUserIdSelector);
    if (!geoId && userId) {
      yield put(fetchGeoId(userId));
    }
    if (isAuthenticated) {
      const pending = yield select(getGeoPending);
      const geoData = yield select(getFirstArray);
      if (geoData.length > 0 && pending === 0) {
        yield put(sendGeoData(geoId, geoData));
      }
    }
    yield delay(BACKEND_CHECK_INTERVAL);
  }
}

function* relogin() {
  const deviceId = yield select(getDeviceIdSelector);
  yield put(fetchAuthTokens(deviceId));
}
function* handleChangePassword() {
  const userId = yield select(getUserIdSelector);
  yield put(fetchGeoId(userId));
  Actions.pop();
}

export function* appSaga() {
  const appState = yield select(appStatusSelector);
  if (appState === APP_STATUS.STARTED) {
    yield fork(initializeApp);
  }
  yield fork(backendEventLoop);
  yield takeEvery(error(REFRESH_TOKENS), relogin);
  yield takeEvery(success(SET_NEW_PASSWORD), handleChangePassword);
}
