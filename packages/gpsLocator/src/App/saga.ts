import { takeEvery, select, put, fork, delay } from 'redux-saga/effects';
import { getUniqueId } from 'react-native-device-info';
import dayjs from 'dayjs';
import { error, success } from 'redux-saga-requests';
import { Actions } from 'react-native-router-flux';
// @ts-ignore
import BackgroundJob from 'react-native-background-job';
import gpsWorker from '../utilities/gpsWorker';
import { getFirstArray, getGeoPending } from '../services/geo/selector';
import {
  CHANGE_APP_STATE,
  IChangeAppState,
  IStartRecording,
  IStopRecording,
  sendGeoData,
  SET_NEW_PASSWORD,
  setIsBackground,
  setNewLocation,
  START_RECORDING,
  STOP_RECORDING,
} from '../services/geo/actions';
import { fetchAuthTokens, fetchGeoId, REFRESH_TOKENS, setAppState, setDeviceInfo } from './actions';
import {
  appStatusSelector,
  getDeviceIdSelector,
  getGeoIdSelector,
  getUserIdSelector,
  isAuthorizedSelector,
} from './selectors';
import { APP_STATUS } from './types';

const backgroundSchedule = {
  jobKey: 'gpsWorker',
  period: 10000,
  exact: true,
  allowWhileIdle: true,
};

const zeroCoords = {
  accuracy: 0,
  altitude: 0,
  heading: 0,
  latitude: 0,
  longitude: 0,
  speed: 0,
  altitudeAccuracy: 0,
};

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

function* handleManageRecording(action: IChangeAppState | IStartRecording | IStopRecording) {
  const isRecording = yield select((state) => state.geo.isRecording);
  switch (action.type) {
    case CHANGE_APP_STATE:
      if (isRecording) {
        if (action.state === 'active') {
          BackgroundJob.cancel({ jobKey: 'gpsWorker' });
          const trackData = gpsWorker.getTrackData();
          for (let i = 0; i++; i < trackData.length) {
            yield put(
              setNewLocation({ timestamp: trackData[i].timestamp, coords: trackData[i].coords }),
            );
          }
          gpsWorker.clearTrackData();
          yield put(setIsBackground(false));
        }
        if (action.state === 'background') {
          yield put(setIsBackground(true));
          BackgroundJob.schedule(backgroundSchedule);
        }
      }
      break;
    case START_RECORDING:
      break;
    case STOP_RECORDING:
      yield put(setNewLocation({ timestamp: dayjs().valueOf(), coords: zeroCoords }));
      break;
  }
}

export function* appSaga() {
  const appState = yield select(appStatusSelector);
  if (appState === APP_STATUS.STARTED) {
    yield fork(initializeApp);
  }
  yield fork(backendEventLoop);
  yield takeEvery(error(REFRESH_TOKENS), relogin);
  yield takeEvery(success(SET_NEW_PASSWORD), handleChangePassword);
  yield takeEvery([CHANGE_APP_STATE, START_RECORDING, STOP_RECORDING], handleManageRecording);
}
