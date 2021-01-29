import { combineReducers } from 'redux';
import { requests, RequestsState } from '../services/requests/reducer';
import { geoIds } from '../services/geoIds/reducer';
import { GeoIdsState } from '../services/geoIds/types';
import { firebase, FireBaseState} from '../services/firebase/reducer';



export const fbConfig = {
  apiKey: 'AIzaSyAV2LLOaSfTF1bkVLlCrz-GXf6bGqMxlHA',
  appId: '1:481033557532:web:0acbb9e526ce8e7fa671d9',
  authDomain: 'easy-tracker-d2a23.firebaseapp.com',
  databaseURL: 'https://easy-tracker-d2a23-default-rtdb.europe-west1.firebasedatabase.app',
  measurementId: 'G-N1HQDYJ6W6',
  messagingSenderId: '481033557532',
  projectId: 'easy-tracker-d2a23',
  storageBucket: 'easy-tracker-d2a23.appspot.com',
};


export type IStoreState = {
  firebase: FireBaseState;
  geoIds: GeoIdsState;
  requests: RequestsState;
};

export default combineReducers({ requests, geoIds, firebase });
