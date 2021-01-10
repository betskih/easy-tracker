import { takeEvery, put, select, delay, all, fork } from 'redux-saga/effects';
import { success } from 'redux-saga-requests';
import { map } from 'lodash';
import { FETCH_GEO_DATA_BY_ID, fetchGeoData, updateGeoData } from '../requests/actions';
import {
  ADD_NEW_GEO_ID,
  fetchFirstRecordDate,
  IAddGeoId,
  IOpenCloseGeoId,
  OPEN_CLOSE_GEO_ID,
  replaceGeoData,
} from './actions';
import {
  getEndDateSelector,
  getGeoIdsSelector,
  getStartDateSelector,
  getUpdateDatesSelector,
} from './selector';

import dayjs = require('dayjs');
import { createTracksData } from './utils';

const UPDATE_TIME = 15 * 1000;

function* handleCheckUpdates() {
  while (true) {
    const ids = yield select(getUpdateDatesSelector);
    const endDate = yield select(getEndDateSelector);
    yield all(
      map(ids, (value) => {
        if (endDate >= value.lastDate) {
          return put(
            updateGeoData({
              geoId: value.id,
              startDate: value.lastDate,
              endDate: endDate,
            }),
          );
        }
      }),
    );
    yield delay(UPDATE_TIME);
  }
}

function* handleFetchFirstData(action: IAddGeoId) {
  const { geoId } = action.payload;
  if (geoId) {
    yield put(fetchFirstRecordDate(geoId));
  }
}

function* handleParseGeoData(action: any) {
  const { geoId, track } = action.response.data.data;
  const tracks = createTracksData(track);
  yield put(replaceGeoData({ geoId, tracks }));
}

function* hanldeOpenCloseAccordion(action: IOpenCloseGeoId) {
  const { geoId, isOpened } = action.payload;
  if (!isOpened) {
    const startDate = yield select(getStartDateSelector);
    const endDate = yield select(getEndDateSelector) || dayjs().valueOf();
    yield put(
      fetchGeoData({
        geoId,
        startDate: startDate,
        endDate: endDate,
      }),
    );
  }
}

export function* geoSaga() {
  yield takeEvery(ADD_NEW_GEO_ID, handleFetchFirstData);
  yield takeEvery(OPEN_CLOSE_GEO_ID, hanldeOpenCloseAccordion);
  yield takeEvery(success(FETCH_GEO_DATA_BY_ID), handleParseGeoData);
  yield fork(handleCheckUpdates);
}
