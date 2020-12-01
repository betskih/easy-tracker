import { IAppActions, SET_APP_STATE, SET_DEVICE_INFO } from './actions';
import { APP_STATUS, IAppState } from './types';

export const initialState: IAppState = {
  deviceInfo: {},
  appState: APP_STATUS.STARTED,
  isModalOpen: false,
};

export function app(state: IAppState = initialState, action: IAppActions) {
  switch (action.type) {
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
    default:
      return state;
  }
}
