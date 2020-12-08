import { get } from 'lodash';
import { createSelector } from 'reselect';
import { IStoreState } from './types';

export const appSelector = (state: IStoreState) => state.app;

export const appStatusSelector = (state: IStoreState) => state.app.appState;

export const isAuthorizedSelector = createSelector(appSelector, (state) => {
  return state.token.length > 0 && state.refreshToken.length > 0;
});

export const getDeviceIdSelector = createSelector(appSelector, (state) => {
  return get(state, 'deviceInfo.uid', '');
});

export const getTokenSelector = createSelector(appSelector, (state) => {
  const token = get(state, 'token', '');
  const refreshToken = get(state, 'refreshToken', '');
  return { token, refreshToken };
});

export const getGeoIdSelector = createSelector(appSelector, (state) => {
  return get(state, 'geoId', '');
});

export const getUserIdSelector = createSelector(appSelector, (state) => {
  return get(state, 'userId', '');
});
