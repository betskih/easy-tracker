import { AnyAction } from 'redux';
import { GeoPoint } from './types';

export const SET_NEW_LOCATION = 'SET_NEW_LOCATION';

export interface ISetNewLocation extends AnyAction {
  type: typeof SET_NEW_LOCATION;
}
export function setNewLocation(location: GeoPoint): ISetNewLocation {
  return { type: SET_NEW_LOCATION, location };
}
export type IGeoAction = ISetNewLocation;
