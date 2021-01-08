import { SensorTrackData } from '../api/GeoTrack';
import { createTracksData, distance } from './utils';

describe('test distance function', () => {
  it('first', () => {
    const res = distance(77.1539, -139.398, -77.1804, -139.55);
    expect(Math.round(res)).toEqual(17166029);
  });
  it('second', () => {
    const res = distance(77.1539, 120.398, 77.1804, 129.55);
    expect(Math.round(res)).toEqual(225883);
  });
  it('short yandex.maps', () => {
    const res = distance(56.86061, 53.211645, 56.860774, 53.214379);
    expect(Math.round(res)).toEqual(167);
  });
  it('long yandex.maps', () => {
    const res = distance(56.86061, 53.211645, 59.66392, 150.136921);
    expect(Math.round(res / 1000)).toEqual(5163);
  });
});

describe('createTracksData test', () => {
  const zero: SensorTrackData = {
    timestamp: 123,
    accuracy: 0,
    altitude: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  };
  const simpleTrack: SensorTrackData = {
    timestamp: 123,
    accuracy: 1,
    altitude: 0,
    heading: 0,
    latitude: 10,
    longitude: 10,
    speed: 0,
  };
  it('empty track data', () => {
    const input: SensorTrackData[] = [];
    expect(createTracksData(input)).toEqual([]);
  });

  it('empty track, zero point only', () => {
    const input: SensorTrackData[] = [zero];
    expect(createTracksData(input)).toEqual([]);
  });

  it('one item track', () => {
    const input: SensorTrackData[] = [simpleTrack];
    expect(createTracksData(input)).toEqual([
      { startDate: 123, endDate: 123, pathLength: 0, pointsCount: 1, data: [simpleTrack] },
    ]);
  });

  it('one item and one zero track', () => {
    const input: SensorTrackData[] = [simpleTrack, zero];
    expect(createTracksData(input)).toEqual([
      { startDate: 123, endDate: 123, pathLength: 0, pointsCount: 1, data: [simpleTrack] },
    ]);
  });

  it(' item - zero - item', () => {
    const input: SensorTrackData[] = [simpleTrack, zero, simpleTrack];
    expect(createTracksData(input)).toEqual([
      { startDate: 123, endDate: 123, pathLength: 0, pointsCount: 1, data: [simpleTrack] },
      { startDate: 123, endDate: 123, pathLength: 0, pointsCount: 1, data: [simpleTrack] },
    ]);
  });

  it(' two normal tracks', () => {
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
    const input: SensorTrackData[] = [...track, zero, ...track, track1];
    expect(createTracksData(input)).toEqual([
      { startDate: 1607665454160, endDate: 1607665471000, pathLength: 113, pointsCount: 2, data: [...track] },
      { startDate: 1607665454160, endDate: 1607665481132, pathLength: 262, pointsCount: 3, data: [...track, track1] },
    ]);
  });
});
