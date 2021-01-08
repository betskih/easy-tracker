import { SensorTrackData } from '../api/GeoTrack';

export type SingleTrackData = {
  startDate: number;
  endDate: number;
  pathLength: number;
  pointsCount: number;
  data: SensorTrackData[];
};

export type GeoDataByID = {
  firstRecordDate: number | undefined;
  firstDate: number | undefined;
  lastDate: number | undefined;
  tracksCount: number;
  tracks: SingleTrackData[];
};

export type GeoIdItem = { id: string; isOpened: boolean };
export interface GeoIdsState {
  ids: GeoIdItem[];
  view: {geoId :string, index: number} | undefined;
  geoData: { [geoId: string]: GeoDataByID } | {};
  startDate: undefined | number,
  endDate: undefined | number,
}
