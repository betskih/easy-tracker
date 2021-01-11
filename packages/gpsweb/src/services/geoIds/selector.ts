import { get, map, forEach, last } from 'lodash';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';
import { IStoreState } from '../../app/root-reducer';
import { SensorTrackData } from '../api/GeoTrack';
import { GeoIdsState, SingleTrackData } from './types';

export const getGeoStateSelector = (state: IStoreState): GeoIdsState => get(state, 'geoIds');

export const getGeoIdsSelector = createSelector(getGeoStateSelector, (state) => state.ids);

export const getStartDateSelector = createSelector(
  getGeoStateSelector,
  (state) => (state.startDate && state.startDate > 1607000000000) || 1607000000000,
);

export const getEndDateSelector = createSelector(getGeoStateSelector, (state) => {
  if (!state.endDate) {
    return dayjs().valueOf();
  }
  return state.endDate < 1607000000001 ? 1607000000001 : state.endDate;
});

export const getGeoDataSelector = createSelector(getGeoStateSelector, (state) => state.geoData);

export const getTrackListSelector = (geoId: string) =>
  createSelector(
    getGeoDataSelector,
    (state) => get(state, `${geoId}.tracks`, []) as SingleTrackData[],
  );

export const getLastTrack = (geoId: string) =>
  createSelector(getTrackListSelector(geoId), (tracks) => get(last(tracks), 'data', []));

export const getTracksLastDateSelector = createSelector(getGeoDataSelector, (state) =>
  map(state, (geoState, key) => {
    return { id: key, lastDate: get(geoState, 'lastDate', 1607000000000) };
  }),
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

export const getUpdateDatesSelector = createSelector(
  getGeoIdsSelector,
  getTracksLastDateSelector,
  (ids, lastDates) => {
    const result: { id: string; lastDate: number }[] = [];
    forEach(ids, (value) => {
      if (value.isOpened) {
        const geoItem = lastDates.find((item) => item.id === value.id);
        result.push({ id: value.id, lastDate: get(geoItem, 'lastDate', 0) + 1 });
      }
    });
    return result;
  },
);
