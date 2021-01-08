export type SensorTrackData = {
  timestamp: number;
  accuracy: number;
  altitude: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
};

export type GeoTrackDto = {
  data: {
    geoId: string;
    track: SensorTrackData[];
  };
};
