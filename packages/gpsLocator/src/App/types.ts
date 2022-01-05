import { IGeoState } from '../services/geo/reducer';

export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export enum APP_STATUS {
  INITIALIZED = 'INITIALIZED',
  STARTED = 'STARTED',
  PENDING = 'PENDING',
}

export type DeviceInfo = {
  uid: string;
};

export interface IAppState {
  deviceInfo: DeviceInfo | {};
  appState: APP_STATUS;
  userId: string;
  geoId: string;
  passwordSet: boolean | undefined;
  token: string;
  refreshToken: string;
  isModalOpen: boolean;
}

export interface IStoreState {
  app: IAppState;
  geo: IGeoState;
}
