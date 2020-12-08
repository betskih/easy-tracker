import { createSelector } from 'reselect';
import { get } from 'lodash';
import dayjs from 'dayjs';
import { IGeoState } from './reducer';

export const getGeoState = (state: any): IGeoState => state.geo;

export const getLastArray = createSelector(getGeoState, (state) =>
  get(state, `${state.lastIndex}`, []),
);

export const getLastArrayList = createSelector(getLastArray, (state) => {
  return state.map((item) => ({
    time: dayjs(item.timestamp).format('HH:mm'),
    latitude: item.coords.latitude,
    longitude: item.coords.longitude,
    speed: item.coords.speed,
  }));
});

export const getFirstArray = createSelector(getGeoState, (state) =>
  get(state, `${state.firstIndex}`, []),
);

export const getGeoPending = createSelector(getGeoState, (state) => get(state, 'pending'));
