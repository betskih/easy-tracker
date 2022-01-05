import { AppStateStatus } from 'react-native';
import { AnyAction } from 'redux';
import { IApiAction } from '../redux/ApiAction';
import { POST_GEO_DATA_URL, PUT_PASSWORD_ENDPOINT } from '../../constants/endpoints';
import { GeoPoint } from './types';

export const SET_IS_BACKGROUND = 'SET_IS_BACKGROUND';
export const SET_NEW_LOCATION = 'SET_NEW_LOCATION';
export const SEND_GEO_DATA = 'SEND_GEO_DATA';
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const CHANGE_APP_STATE = 'CHANGE_APP_STATE';

export interface ISetIsBackground extends AnyAction {
  type: typeof SET_IS_BACKGROUND;
}

export function setIsBackground(isBackground: boolean): ISetIsBackground {
  return { type: SET_IS_BACKGROUND, isBackground };
}

export interface IChangeAppState extends AnyAction {
  type: typeof CHANGE_APP_STATE;
}
export function changeAppState(state: AppStateStatus): IChangeAppState {
  return { type: CHANGE_APP_STATE, state };
}

export interface IStartRecording extends AnyAction {
  type: typeof START_RECORDING;
}
export function startRecording(): IStartRecording {
  return { type: START_RECORDING };
}

export interface IStopRecording extends AnyAction {
  type: typeof STOP_RECORDING;
}
export function stopRecording(): IStopRecording {
  return { type: STOP_RECORDING };
}

export interface ISetNewLocation extends AnyAction {
  type: typeof SET_NEW_LOCATION;
}
export function setNewLocation(location: GeoPoint): ISetNewLocation {
  return { type: SET_NEW_LOCATION, location };
}

export interface ISendGeoData extends IApiAction {
  type: typeof SEND_GEO_DATA;
}
export function sendGeoData(geoId: string, geoData: GeoPoint[]): ISendGeoData {
  return {
    type: SEND_GEO_DATA,
    request: {
      url: POST_GEO_DATA_URL,
      method: 'POST',
      body: JSON.stringify({ geoId, data: geoData }),
    },
  };
}

export interface ISetNewPassword extends IApiAction {
  type: typeof SET_NEW_PASSWORD;
}

export function setNewPassword(geoId: string, password: string): ISetNewPassword {
  return {
    type: SET_NEW_PASSWORD,
    request: {
      url: PUT_PASSWORD_ENDPOINT,
      method: 'PUT',
      body: JSON.stringify({ geoId, password }),
    },
  };
}

export type IGeoAction =
  | ISetNewLocation
  | ISendGeoData
  | ISetNewPassword
  | IStartRecording
  | IStopRecording
  | ISetIsBackground;
