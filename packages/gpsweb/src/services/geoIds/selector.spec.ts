import { getGeoIdsSelector } from './selector';
import { GeoIdsState } from './types';

describe('getGeoIdsSelector test', () => {
  it('should return all items in array', () => {
    const state:GeoIdsState = {
      ids: [
        { id: '1111', isOpened: false },
        { id: '22', isOpened: true },
        { id: '33', isOpened: false },
      ],
      geoData: {},
      startDate: undefined,
      endDate: undefined,
      view: undefined,
    };
    expect(getGeoIdsSelector.resultFunc(state)).toEqual([
      { id: '1111', isOpened: false },
      { id: '22', isOpened: true },
      { id: '33', isOpened: false },
    ]);
  });
});
