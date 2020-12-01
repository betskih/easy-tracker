import { GeoCoordinates } from 'react-native-geolocation-service';

export type GeoPoint = {
  timestamp: number;
  coords: GeoCoordinates;
};
