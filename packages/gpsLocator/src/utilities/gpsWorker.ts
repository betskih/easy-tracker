import Geolocation from 'react-native-geolocation-service';

let buffer: Array<any> = [];

const gpsWorker = {
  proceedTracking: () => {
    Geolocation.getCurrentPosition(
      (coords: any) => {
        if (coords.accuracy < 50) {
          buffer.push(coords);
        }
      },
      (e) => {},
      {
        enableHighAccuracy: true,
      },
    );
  },

  getTrackData: () => {
    return buffer;
  },

  clearTrackData: () => {
    buffer = [];
  },
};

export default gpsWorker;
