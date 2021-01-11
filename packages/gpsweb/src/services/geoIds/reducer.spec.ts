import { IReplaceLastGeoData, REPLACE_LAST_GEO_DATA } from './actions';
import { GeoIdsState } from './types';
import { geoIds } from './reducer';

describe('REPLACE_LAST_GEO_DATA reducer test', () => {
  it('state: [], payload: []', () => {
    const initialState: GeoIdsState = {
      ids: [],
      geoData: {
        111: {
          firstDate: undefined,
          firstRecordDate: 1607349646186,
          lastDate: undefined,
          tracks: [],
          tracksCount: 0,
        },
      },
      startDate: undefined,
      endDate: undefined,
      view: undefined,
    };

    const action: IReplaceLastGeoData = {
      type: REPLACE_LAST_GEO_DATA,
      payload: {
        geoId: '111',
        tracks: [],
      },
    };

    const newState = geoIds(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('state: [2 el], payload: [1 el]', () => {
    const initialState: GeoIdsState = {
      ids: [],
      geoData: {
        111: {
          firstDate: undefined,
          firstRecordDate: 1607349646186,
          lastDate: undefined,
          tracks: [{ data: [1, 2] }, { data: [3] }],
          tracksCount: 2,
        },
      },
      startDate: undefined,
      endDate: undefined,
      view: undefined,
    };

    const action: IReplaceLastGeoData = {
      type: REPLACE_LAST_GEO_DATA,
      payload: {
        geoId: '111',
        tracks: [{ data: [3, 4] }],
      },
    };

    const newState = geoIds(initialState, action);
    const expected: GeoIdsState = {
      ids: [],
      geoData: {
        111: {
          firstDate: undefined,
          firstRecordDate: 1607349646186,
          lastDate: undefined,
          tracks: [{ data: [1, 2] }, { data: [3, 4] }],
          tracksCount: 2,
        },
      },
      startDate: undefined,
      endDate: undefined,
      view: undefined,
    };
    expect(newState).toEqual(expected);
  });
});
