import { takeEvery, select, put, fork, delay } from 'redux-saga/effects';

import { getUniqueId } from 'react-native-device-info';
import { error } from 'redux-saga-requests';
import { back, replace } from '../navigation/NavigationService';
import { getFirstArray, getGeoPending } from '../services/geo/selector';
import { sendGeoData } from '../services/geo/actions';
import {
  BACK_ROUTE,
  fetchAuthTokens,
  fetchGeoId,
  IAppRoute,
  REFRESH_TOKENS,
  REPLACE_ROUTE,
  setAppState,
  setDeviceInfo,
} from './actions';
import {
  appStatusSelector,
  getDeviceIdSelector,
  getGeoIdSelector,
  getUserIdSelector,
  isAuthorizedSelector,
} from './selectors';
import { APP_STATUS } from './types';

export const BACKEND_CHECK_INTERVAL = 15 * 1000;

export function* onReplaceRoute(action: IAppRoute) {
  const { route, params } = action;
  replace(route, params);
}
export function* backRoute() {
  back();
}

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

export function* appSaga() {
  const appState = yield select(appStatusSelector);
  if (appState === APP_STATUS.STARTED) {
    yield fork(initializeApp);
  }
  yield fork(backendEventLoop);
  yield takeEvery(REPLACE_ROUTE, onReplaceRoute);
  yield takeEvery(BACK_ROUTE, backRoute);
  yield takeEvery(error(REFRESH_TOKENS), relogin);
}
