import { Action, AnyAction } from 'redux';
import { APP_STATUS, DeviceInfo, LogLevel } from './types';

export const CLEAR_PERSISTED_STORE = 'CLEAR_PERSISTED_STORE';
export const SET_APP_STATE = 'SET_APP_STATE';
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO';
export const APP_LOG = 'APP_LOG';

export interface ISetDeviceInfo extends AnyAction {
  type: typeof SET_DEVICE_INFO;
}
export function setDeviceInfo(deviceInfo: DeviceInfo): ISetDeviceInfo {
  return { type: SET_DEVICE_INFO, deviceInfo };
}

export interface ISetAppState extends AnyAction {
  type: typeof SET_APP_STATE;
}
export function setAppState(appState: APP_STATUS): ISetAppState {
  return { type: SET_APP_STATE, appState };
}

export function appLog(name: string, payload: any, level = LogLevel.INFO): IAppLog {
  return {
    type: APP_LOG,
    name,
    payload,
    level,
  };
}
export interface IAppLog extends Action {
  type: typeof APP_LOG;
  name: string;
  payload: any;
  level: LogLevel;
}

export interface IClearPersistedStore extends AnyAction {
  type: typeof CLEAR_PERSISTED_STORE;
}

export function clearPersistedStore(): IClearPersistedStore {
  return {
    type: CLEAR_PERSISTED_STORE,
  };
}

export const APP_ROUTE = 'APP_ROUTE';

export interface IAppRoute extends Action {
  type: typeof APP_ROUTE;
  route: string;
  params: any;
  key: string;
}

export function appRoute(route: string, params?: any, key?: any): IAppRoute {
  return {
    type: APP_ROUTE,
    route,
    params,
    key,
  };
}

export const REPLACE_ROUTE = 'REPLACE_ROUTE';
export interface IReplaceRoute extends Action {
  type: typeof REPLACE_ROUTE;
  route: string;
  params: any;
}
export function replaceRoute(route: string, params?: any): IReplaceRoute {
  return {
    type: REPLACE_ROUTE,
    route,
    params,
  };
}

export const BACK_ROUTE = 'BACK_ROUTE';
export interface IBackRouteAction extends Action {
  type: typeof BACK_ROUTE;
}

export function backRouteAction(): IBackRouteAction {
  return {
    type: BACK_ROUTE,
  };
}

export type IAppActions = IAppRoute | IReplaceRoute | ISetAppState | ISetDeviceInfo;
