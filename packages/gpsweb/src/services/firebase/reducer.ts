import { FireBaseActions, SAVE_FIREBASE_AUTH_DATA } from './actions';

export type FireBaseState = any;

const initialState = {};

export const firebase = (state: FireBaseState = initialState, action: FireBaseActions) => {
  switch (action.type) {
    case SAVE_FIREBASE_AUTH_DATA:
      return  { ...action.payload };
    default:
      return state;
  }
};
