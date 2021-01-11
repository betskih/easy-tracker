import { get, map, forEach, last } from 'lodash';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';
import { IStoreState } from '../../app/root-reducer';
import { SensorTrackData } from '../api/GeoTrack';
import { GeoIdsState, SingleTrackData } from './types';

const EPOCH_START = 1607000000000;

export const getGeoStateSelector = (state: IStoreState): GeoIdsState => get(state, 'geoIds');

export const getGeoIdsSelector = createSelector(getGeoStateSelector, (state) => state.ids);

export const getStartDateSelector = createSelector(getGeoStateSelector, (state) => {
  if (!state.startDate) {
    return EPOCH_START;
  }
  return state.startDate >= EPOCH_START ? state.startDate : EPOCH_START;
});

export const getEndDateSelector = createSelector(getGeoStateSelector, (state) => {
  if (!state.endDate) {
    return dayjs().valueOf();
  }
  return state.endDate < EPOCH_START+1 ? EPOCH_START+1 : state.endDate;
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
    return { id: key, lastDate: get(geoState, 'lastDate', EPOCH_START) };
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
