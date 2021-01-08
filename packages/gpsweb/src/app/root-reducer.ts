import { combineReducers } from 'redux';
import { requests, RequestsState } from '../services/requests/reducer';
import { geoIds } from '../services/geoIds/reducer';
import { GeoIdsState } from '../services/geoIds/types';

export type IStoreState = {
  geoIds: GeoIdsState;
  requests: RequestsState;
};

export default combineReducers({ requests, geoIds });
