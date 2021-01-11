import { takeEvery, put, select, delay, all, fork } from 'redux-saga/effects';
import { success } from 'redux-saga-requests';
import { map } from 'lodash';
import {FETCH_GEO_DATA_BY_ID, fetchGeoData, UPDATE_GEO_DATA_BY_ID, updateGeoData} from '../requests/actions';
import {
  ADD_NEW_GEO_ID,
  fetchFirstRecordDate,
  IAddGeoId,
  IOpenCloseGeoId,
  OPEN_CLOSE_GEO_ID,
  replaceGeoData, replaceLastGeoData, SET_END_DATE, SET_START_DATE,
} from './actions';
import {
  getEndDateSelector, getGeoIdsSelector, getLastTrack,
  getStartDateSelector,
  getUpdateDatesSelector,
} from './selector';

import { createTracksData } from './utils';

const UPDATE_TIME = 15 * 1000;

function* handleCheckUpdates() {
  while (true) {
    const ids = yield select(getUpdateDatesSelector);
    const startDate = yield select(getStartDateSelector);
    const endDate = yield select(getEndDateSelector);
    yield all(
      map(ids, (value) => {
        if (endDate >= value.lastDate) {
          return put(
            updateGeoData({
              geoId: value.id,
              startDate: Math.max(value.lastDate,startDate),
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

function* handleUpdateGeoData(action: any) {
  const { geoId, track } = action.response.data.data;
  const lastExisted = yield select(getLastTrack(geoId));
  const tracks = createTracksData([...lastExisted, ...track]);
  yield put(replaceLastGeoData({ geoId, tracks }));
}

function* handleOpenCloseAccordion(action: IOpenCloseGeoId) {
  const { geoId, isOpened } = action.payload;
  if (!isOpened) {
    const startDate = yield select(getStartDateSelector);
    const endDate = yield select(getEndDateSelector);
    yield put(
      fetchGeoData({
        geoId,
        startDate: startDate,
        endDate: endDate,
      }),
    );
  }
}

function* handleFetchAllOpened () {
  const opened = yield select(getGeoIdsSelector);
  const startDate = yield select(getStartDateSelector);
  const endDate = yield select(getEndDateSelector);
  yield  all(opened.map((item: any)=>{
    if (item.isOpened){
      return put(
        fetchGeoData({
          geoId: item.id,
          startDate: startDate,
          endDate: endDate,
        }),
      );
    }
  }));
}



export function* geoSaga() {
  yield takeEvery(ADD_NEW_GEO_ID, handleFetchFirstData);
  yield takeEvery(OPEN_CLOSE_GEO_ID, handleOpenCloseAccordion);
  yield takeEvery(success(FETCH_GEO_DATA_BY_ID), handleParseGeoData);
  yield takeEvery(success(UPDATE_GEO_DATA_BY_ID), handleUpdateGeoData);
  yield takeEvery([SET_START_DATE, SET_END_DATE], handleFetchAllOpened);
  yield fork(handleCheckUpdates);
}
