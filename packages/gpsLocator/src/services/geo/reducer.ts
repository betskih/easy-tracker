import { get } from 'lodash';
import { GeoPoint } from './types';
import { IGeoAction, SET_NEW_LOCATION } from './actions';

export interface IGeoState {
  [k: number]: GeoPoint[];
  lastIndex: number;
  lastAmount: number;
}

export const initialState: IGeoState = {
  lastIndex: 0,
  lastAmount: 0,
  0: [],
};

export function geo(state: IGeoState = initialState, action: IGeoAction) {
  switch (action.type) {
    case SET_NEW_LOCATION:
      const current = state.lastAmount >= 200 ? state.lastIndex + 1 : state.lastIndex;
      const amount = state.lastIndex !== current ? 1 : state.lastAmount + 1;
      const newArray = [...get(state, current, [])];
      newArray.push(action.location);
      return {
        ...state,
        lastIndex: current,
        lastAmount: amount,
        [current]: newArray,
      };
    default:
      return state;
  }
}
