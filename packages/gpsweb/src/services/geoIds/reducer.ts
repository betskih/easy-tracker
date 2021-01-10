import { find, get } from 'lodash';
import { success } from 'redux-saga-requests';
import { pathLens, replace } from '../lens/lens';
import {
  ADD_NEW_GEO_ID,
  FETCH_FIRST_GEO_RECORD_DATE,
  GeoIdActions,
  OPEN_CLOSE_GEO_ID,
  REPLACE_GEO_DATA,
  SET_END_DATE,
  SET_MAP_VIEW_PARAMS,
  SET_START_DATE,
} from './actions';
import { GeoDataByID, GeoIdItem, GeoIdsState } from './types';

const initialState: GeoIdsState = {
  ids: [],
  geoData: {},
  startDate: undefined,
  endDate: undefined,
  view: undefined,
};

const initialGeoDataById: GeoDataByID = {
  firstRecordDate: undefined,
  firstDate: undefined,
  lastDate: undefined,
  tracksCount: 0,
  tracks: [],
};

export const geoIds = (state: GeoIdsState = initialState, action: GeoIdActions) => {
  switch (action.type) {
    case ADD_NEW_GEO_ID:
      const newId = get(action, 'payload.geoId', '');
      const oldId = find(state, (item) => item === newId);
      if (oldId) {
        return state;
      } else {
        return {
          ...state,
          ids: [...state.ids, { id: newId, isOpened: false }],
          geoData: {
            ...state.geoData,
            [newId]: { ...initialGeoDataById },
          },
        };
      }
    case OPEN_CLOSE_GEO_ID:
      return {
        ...state,
        ids: [
          ...state.ids.map((item: GeoIdItem) => ({
            id: item.id,
            isOpened: item.id === action.payload.geoId ? !item.isOpened : item.isOpened,
          })),
        ],
      };
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload.date,
      };

    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload.date,
      };
    case success(FETCH_FIRST_GEO_RECORD_DATE): {
      const { geoId, firstRecordDate } = action.response.data.data;
      return replace(pathLens(['geoData', geoId, 'firstRecordDate']), firstRecordDate, state);
    }
    case REPLACE_GEO_DATA: {
      const { geoId, tracks } = action.payload;
      return {
        ...state,
        geoData: {
          ...state.geoData,
          [geoId]: {
            firstRecordDate: get(state, `geoData.${geoId}.firstRecordDate`),
            firstDate: get(tracks, '0.startDate'),
            lastDate: get(tracks, `${tracks.length - 1}.endDate`),
            tracksCount: tracks.length,
            tracks,
          },
        },
      };
    }
    case SET_MAP_VIEW_PARAMS:
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
};
