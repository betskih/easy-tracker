import { get } from 'lodash';
import { createSelector } from 'reselect';
import { IStoreState } from '../../app/root-reducer';
import { SensorTrackData } from '../api/GeoTrack';
import { GeoIdsState, SingleTrackData } from './types';

export const getGeoStateSelector = (state: IStoreState): GeoIdsState => get(state, 'geoIds');

export const getGeoIdsSelector = createSelector(getGeoStateSelector, (state) => state.ids);

export const getStartDateSelector = createSelector(getGeoStateSelector, (state) => state.startDate || 1607000000000);

export const getEndDateSelector = createSelector(getGeoStateSelector, (state) => state.endDate);

export const getGeoDataSelector = createSelector(getGeoStateSelector, (state) => state.geoData);

export const getTrackListSelector = (geoId: string) =>
  createSelector(
    getGeoDataSelector,
    (state) => get(state, `${geoId}.tracks`, []) as SingleTrackData[],
  );

export const getMapViewParams = createSelector(getGeoStateSelector, (state) => state.view);

export const getYandexTrack = createSelector(
  getMapViewParams,
  getGeoDataSelector,
  (params, geoData) => {
    if (params) {
      const track = get(geoData, `${params.geoId}.tracks.${params.index}.data`);
      return track.map((item: SensorTrackData) => [item.latitude, item.longitude]);
    }
    return [];
  },
);
