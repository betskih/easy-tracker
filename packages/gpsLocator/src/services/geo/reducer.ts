import { get, reduce, set } from 'lodash';
import { success, error } from 'redux-saga-requests';
import { GeoPoint } from './types';
import { IGeoAction, SEND_GEO_DATA, SET_NEW_LOCATION } from './actions';

export interface IGeoState {
  [k: number]: GeoPoint[];
  firstIndex: number;
  lastIndex: number;
  lastAmount: number;
  pending: number;
}

export const initialState: IGeoState = {
  firstIndex: 0,
  lastIndex: 0,
  lastAmount: 0,
  pending: 0,
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
    case success(SEND_GEO_DATA):
      const count = get(action, 'data.data.inserted', 0);
      const branch = get(state, state.firstIndex, []);
      if (count === branch.length) {
        if (state.firstIndex === state.lastIndex) {
          return { 0: [], firstIndex: 0, lastAmount: 0, lastIndex: 0, pending: 0 };
        } else {
          return {
            ...reduce(
              state,
              (result, value, key) => {
                if (key !== state.firstIndex.toString()) {
                  set(result, key, value);
                }
                return result;
              },
              {},
            ),
            firstIndex: state.firstIndex + 1,
            pending: 0,
          };
        }
      } else {
        return {
          ...state,
          [state.firstIndex]: reduce(
            branch,
            (result, value, key) => {
              if (key >= count) {
                result.push(value);
              }
              return result;
            },
            [],
          ),
          pending: 0,
          lastAmount:
            state.firstIndex === state.lastIndex ? state.lastAmount - count : state.lastAmount,
        };
      }
    case error(SEND_GEO_DATA):
      return { ...state, pending: 0 };
    case SEND_GEO_DATA:
      return { ...state, pending: 1 };
    default:
      return state;
  }
}
