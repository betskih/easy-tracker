import { isNaN, isUndefined } from 'lodash';
import { MapState } from 'react-yandex-maps';

export const DEFAULT_ZOOM = 13;
export const DEFAULT_STATE = { center: [56.8613653, 53.2278155], zoom: DEFAULT_ZOOM };
const ACCURACY_VALUE = 10000000;

type TExtremeValue = {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
};

export function getExtremeValue(track: Array<Array<number>>): TExtremeValue {
  const result = {} as TExtremeValue;

  for (let i = 0; i < track.length; i++) {
    const el = track[i];
    if (!isNaN(el[0])) {
      if (!isUndefined(result.maxLatitude)) {
        if (el[0] > result.maxLatitude) {
          result.maxLatitude = el[0];
        }
        if (el[0] < result.minLatitude) {
          result.minLatitude = el[0];
        }
      } else {
        result.maxLatitude = result.minLatitude = el[0];
      }
    }
    if (!isNaN(el[1])) {
      if (!isUndefined(result.maxLongitude)) {
        if (el[1] > result.maxLongitude) {
          result.maxLongitude = el[1];
        }
        if (el[1] < result.minLongitude) {
          result.minLongitude = el[1];
        }
      } else {
        result.maxLongitude = result.minLongitude = el[1];
      }
    }
  }

  return result;
}

export const zoomValue: Array<{ widthRatio: number; heightRatio: number }> = [
  { widthRatio: 13107200, heightRatio: 7864320 },
  { widthRatio: 6553600, heightRatio: 3932160 },
  { widthRatio: 3276800, heightRatio: 1966080 },
  { widthRatio: 1638400, heightRatio: 983040 },
  { widthRatio: 819200, heightRatio: 491520 },
  { widthRatio: 409600, heightRatio: 245760 },
  { widthRatio: 204800, heightRatio: 122880 },
  { widthRatio: 102400, heightRatio: 61440 },
  { widthRatio: 51200, heightRatio: 30720 },
  { widthRatio: 25600, heightRatio: 15360 },
  { widthRatio: 12800, heightRatio: 7680 },
  { widthRatio: 6400, heightRatio: 3840 },
  { widthRatio: 3200, heightRatio: 1920 },
  { widthRatio: 1600, heightRatio: 960 },
  { widthRatio: 800, heightRatio: 480 },
  { widthRatio: 400, heightRatio: 240 },
  { widthRatio: 200, heightRatio: 120 },
  { widthRatio: 100, heightRatio: 60 },
  { widthRatio: 50, heightRatio: 30 },
  { widthRatio: 25, heightRatio: 15 },
];

export function getZoomValue(
  widthRatio: number,
  heightRatio: number,
  zoomValueDefault = DEFAULT_ZOOM,
): number {
  for (let i = zoomValue.length - 1; i >= 0; i--) {
    if (widthRatio < zoomValue[i].widthRatio && heightRatio < zoomValue[i].heightRatio) {
      zoomValueDefault = i;
      break;
    }
  }
  return zoomValueDefault;
}

export function getZoom(
  { minLatitude, maxLatitude, minLongitude, maxLongitude }: TExtremeValue,
  width = window.innerWidth - 400,
  height = window.innerHeight,
): number {
  const lengthLatitude = maxLatitude - minLatitude;
  const lengthLongitude = maxLongitude - minLongitude;
  const heightRatio = Math.ceil((lengthLatitude * ACCURACY_VALUE) / height);
  const widthRatio = Math.ceil((lengthLongitude * ACCURACY_VALUE) / width);
  return getZoomValue(widthRatio, heightRatio);
}

export function getDefaultState(
  track: Array<Array<number>>,
  defaultState = DEFAULT_STATE,
): MapState {
  if (track.length === 0) {
    return defaultState;
  }
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = getExtremeValue(track);
  const latitude = Math.ceil(((minLatitude + maxLatitude) * ACCURACY_VALUE) / 2) / ACCURACY_VALUE;
  const longitude =
    Math.ceil(((minLongitude + maxLongitude) * ACCURACY_VALUE) / 2) / ACCURACY_VALUE;

  const zoom = getZoom({ minLatitude, maxLatitude, minLongitude, maxLongitude });

  return { center: [latitude, longitude], zoom };
}
