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
  isModalOpen: boolean;
}

export interface IStoreState {
  app: IAppState;
}
