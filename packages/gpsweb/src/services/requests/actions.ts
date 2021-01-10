import { FETCH_GEO_DATA_ENDPOINT } from '../api/endpoints';
import { IApiAction } from './types';

export const FETCH_GEO_DATA_BY_ID = 'FETCH_GEO_DATA_BY_ID';
export const UPDATE_GEO_DATA_BY_ID = 'UPDATE_GEO_DATA_BY_ID';


export interface IFetchGeoData extends IApiAction {
  type: typeof FETCH_GEO_DATA_BY_ID;
}

export const fetchGeoData = ({
  geoId,
  startDate,
  endDate,
}: {
  geoId: string;
  startDate: number;
  endDate: number;
}): IFetchGeoData => ({
  type: FETCH_GEO_DATA_BY_ID,
  request: {
    url: FETCH_GEO_DATA_ENDPOINT,
    method: 'POST',
    data: { geoId, startDate, endDate },
  },
});


export interface IUpdateGeoData extends IApiAction {
  type: typeof UPDATE_GEO_DATA_BY_ID;
}

export const updateGeoData = ({
  geoId,
  startDate,
  endDate,
}: {
  geoId: string;
  startDate: number;
  endDate: number;
}): IUpdateGeoData => ({
  type: UPDATE_GEO_DATA_BY_ID,
  request: {
    url: FETCH_GEO_DATA_ENDPOINT,
    method: 'POST',
    data: { geoId, startDate, endDate },
  },
});


export type RequestActions = IFetchGeoData | IUpdateGeoData;

