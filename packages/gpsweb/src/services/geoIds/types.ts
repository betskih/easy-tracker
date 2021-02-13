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

export type GeoView = { geoId: string; index: number } | undefined;

export interface GeoIdsState {
  ids: GeoIdItem[];
  view: GeoView;
  geoData: { [geoId: string]: GeoDataByID } | {};
  startDate: undefined | number;
  endDate: undefined | number;
}
