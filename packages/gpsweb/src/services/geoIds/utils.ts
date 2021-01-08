import { forEach } from 'lodash';
import { SensorTrackData } from '../api/GeoTrack';
import { SingleTrackData } from './types';

const rad = 6372795;

export const distance = (llat1: number, llong1: number, llat2: number, llong2: number) => {
  const lat1 = (llat1 * Math.PI) / 180;
  const lat2 = (llat2 * Math.PI) / 180;
  const long1 = (llong1 * Math.PI) / 180;
  const long2 = (llong2 * Math.PI) / 180;

  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  const y = Math.sqrt((cl2 * sdelta) ** 2 + (cl1 * sl2 - sl1 * cl2 * cdelta) ** 2);
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;
  const ad = Math.atan2(y, x);
  return Math.round(ad * rad);
};

export const createTracksData = (track: SensorTrackData[]) => {
  const tracks: SingleTrackData[] = [];
  let singleTrack: SingleTrackData = {
    startDate: 0,
    endDate: 0,
    pathLength: 0,
    pointsCount: 0,
    data: [],
  };
  let lastPoint: SensorTrackData = {
    timestamp: 0,
    accuracy: 0,
    altitude: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  };
  forEach(track, (item: SensorTrackData) => {
    if (item.accuracy === 0 && item.latitude <= 0.00001 && item.longitude <= 0.00001) {
      if (singleTrack.startDate !== 0) {
        tracks.push({ ...singleTrack });
        singleTrack = {
          startDate: 0,
          endDate: 0,
          pathLength: 0,
          pointsCount: 0,
          data: [],
        };
        lastPoint = {
          timestamp: 0,
          accuracy: 0,
          altitude: 0,
          heading: 0,
          latitude: 0,
          longitude: 0,
          speed: 0,
        };
      }
    } else {
      if (!singleTrack.startDate) {
        singleTrack.startDate = item.timestamp;
      }

      if (lastPoint.timestamp) {
        singleTrack.pathLength = singleTrack.pathLength + distance(
          lastPoint.latitude,
          lastPoint.longitude,
          item.latitude,
          item.longitude,
        );
    }
      lastPoint = item;
      singleTrack.pointsCount++;
      singleTrack.endDate = item.timestamp;
      singleTrack.data.push(item);
    }
  });

  if (singleTrack.startDate) {
    tracks.push({ ...singleTrack });
  }

  return tracks;
};
