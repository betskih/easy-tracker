import { AnyAction } from 'redux';
import { IApiAction } from '../requests/types';
import { FETCH_FIRST_GEO_RECORD_ENDPOINT } from '../api/endpoints';

export const ADD_NEW_GEO_ID = 'ADD_NEW_GEO_ID';
export const OPEN_CLOSE_GEO_ID = 'OPEN_CLOSE_GEO_ID';
export const CHECK_GEO_UPDATES = 'CHECK_GEO_UPDATES';
export const FETCH_FIRST_GEO_RECORD_DATE = 'FETCH_FIRST_GEO_RECORD_DATE';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const REPLACE_GEO_DATA = 'REPLACE_GEO_DATA';
export const SET_MAP_VIEW_PARAMS = 'SET_MAP_VIEW_PARAMS';

export interface IReplaceGeoData extends AnyAction {
  type: typeof REPLACE_GEO_DATA;
}

export const replaceGeoData = ({
  geoId,
  tracks,
}: {
  geoId: string;
  tracks: any[];
}): IReplaceGeoData => ({
  type: REPLACE_GEO_DATA,
  payload: { geoId, tracks },
});

export interface IAddGeoId extends AnyAction {
  type: typeof ADD_NEW_GEO_ID;
}

export const addGeoIdAction = (geoId: string): IAddGeoId => ({
  type: ADD_NEW_GEO_ID,
  payload: { geoId },
});

export interface IOpenCloseGeoId extends AnyAction {
  type: typeof OPEN_CLOSE_GEO_ID;
}

export const openCloseGeoId = ({
  geoId,
  isOpened,
}: {
  geoId: string;
  isOpened: boolean;
}): IOpenCloseGeoId => ({
  type: OPEN_CLOSE_GEO_ID,
  payload: { geoId, isOpened },
});

export interface ICheckGeoUpdates extends AnyAction {
  type: typeof CHECK_GEO_UPDATES;
}

export const checkGeoUpdates = (startDate: number, endDate: number): ICheckGeoUpdates => ({
  type: CHECK_GEO_UPDATES,
  payload: { startDate, endDate },
});

export interface IFetchFirstRecordDate extends IApiAction {
  type: typeof FETCH_FIRST_GEO_RECORD_DATE;
}

export const fetchFirstRecordDate = (geoId: string): IFetchFirstRecordDate => ({
  type: FETCH_FIRST_GEO_RECORD_DATE,
  request: {
    url: FETCH_FIRST_GEO_RECORD_ENDPOINT(geoId),
    method: 'GET',
  },
});

export interface ISetStartDate extends AnyAction {
  type: typeof SET_START_DATE;
}

export const setStartDateAction = (date: number): ISetStartDate => ({
  type: SET_START_DATE,
  payload: { date },
});

export interface ISetEndDate extends AnyAction {
  type: typeof SET_END_DATE;
}
export const setEndDateAction = (date: number): ISetEndDate => ({
  type: SET_END_DATE,
  payload: { date },
});

export interface ISetMapViewParams extends AnyAction {
  type: typeof SET_MAP_VIEW_PARAMS;
}
export const setMapViewParams = (payload: { geoId: string; index: number }): ISetMapViewParams => ({
  type: SET_MAP_VIEW_PARAMS,
  payload,
});

export type GeoIdActions =
  | IAddGeoId
  | IOpenCloseGeoId
  | ICheckGeoUpdates
  | IFetchFirstRecordDate
  | ISetStartDate
  | ISetEndDate
  | IReplaceGeoData
  | ISetMapViewParams;
