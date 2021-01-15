import { success } from 'redux-saga-requests';
import { get } from 'lodash';
import {
  FETCH_AUTH_TOKENS,
  FETCH_GEO_ID,
  IAppActions,
  REFRESH_TOKENS,
  SET_APP_STATE,
  SET_DEVICE_INFO,
} from './actions';
import { APP_STATUS, IAppState } from './types';

export const initialState: IAppState = {
  deviceInfo: {},
  appState: APP_STATUS.STARTED,
  userId: '',
  geoId: '',
  passwordSet: undefined,
  token: '',
  refreshToken: '',
  isModalOpen: false,
};

export function app(state: IAppState = initialState, action: IAppActions) {
  const responce = get(action, 'data.data', {});
  switch (action.type) {
    case success(REFRESH_TOKENS):
      return {
        ...state,
        token: responce.token,
        refreshToken: responce.refreshToken,
      };
    case SET_APP_STATE:
      return {
        ...state,
        appState: action.appState,
      };
    case SET_DEVICE_INFO:
      return {
        ...state,
        deviceInfo: action.deviceInfo,
      };
    case success(FETCH_AUTH_TOKENS):
      return {
        ...state,
        token: responce.token,
        refreshToken: responce.refreshToken,
        userId: responce.id,
      };
    case success(FETCH_GEO_ID):
      return {
        ...state,
        geoId: responce.geoId,
        passwordSet: responce.passwordSet,
      };
    default:
      return state;
  }
}
