import { AnyAction } from 'redux';

export const SAVE_FIREBASE_AUTH_DATA = 'SAVE_FIREBASE_AUTH_DATA';

export interface ISaveFireBaseAuthData extends AnyAction {
  type: typeof SAVE_FIREBASE_AUTH_DATA;
}

export const saveFireBaseAuthData = (data: any): ISaveFireBaseAuthData => ({
  type: SAVE_FIREBASE_AUTH_DATA,
  payload: data,
});

export type FireBaseActions = ISaveFireBaseAuthData;
