import { getGeoIdsSelector, getLastTrack } from './selector';
import { GeoIdsState } from './types';

describe('getGeoIdsSelector test', () => {
  it('should return all items in array', () => {
    const state: GeoIdsState = {
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

describe('getLastTrack test', () => {
  const track = [
    {
      accuracy: 25.0879993438721,
      altitude: 162.5,
      heading: 167.888412475586,
      latitude: 56.8530073,
      longitude: 53.2236937,
      speed: 15.1334018707275,
      timestamp: 1607665454160,
    },
    {
      accuracy: 3.90000009536743,
      altitude: 162.5,
      heading: 170.896255493164,
      latitude: 56.8520139,
      longitude: 53.2240485,
      speed: 7.95671224594116,
      timestamp: 1607665471000,
    },
  ];
  const track1 = {
    accuracy: 11.2340002059937,
    altitude: 163.300003051758,
    heading: 167.589294433594,
    latitude: 56.8507056,
    longitude: 53.2245713,
    speed: 13.3003463745117,
    timestamp: 1607665481132,
  };
  const tracks = [
    {
      startDate: 1607665454160,
      endDate: 1607665471000,
      pathLength: 113,
      pointsCount: 2,
      data: [...track],
    },
    {
      startDate: 1607665454160,
      endDate: 1607665481132,
      pathLength: 262,
      pointsCount: 3,
      data: [...track, track1],
    },
  ];
  it('last of two tracks', () => {
    expect(getLastTrack('111',).resultFunc(tracks)).toEqual([...track, track1]);
  });

  it('empty tracks', () => {
    expect(getLastTrack('111',).resultFunc([])).toEqual([]);
  });
});
