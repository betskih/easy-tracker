import { takeEvery, select, put, fork } from 'redux-saga/effects';

import { getUniqueId } from 'react-native-device-info';
import { back, replace } from '../navigation/NavigationService';
import { BACK_ROUTE, IAppRoute, REPLACE_ROUTE, setAppState, setDeviceInfo } from './actions';
import { appStatusSelector } from './selectors';
import { APP_STATUS } from './types';

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

export function* appSaga() {
  const appState = yield select(appStatusSelector);
  if (appState === APP_STATUS.STARTED) {
    yield fork(initializeApp);
  }
  yield takeEvery(REPLACE_ROUTE, onReplaceRoute);
  yield takeEvery(BACK_ROUTE, backRoute);
}
