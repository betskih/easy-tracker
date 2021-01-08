import { success } from 'redux-saga-requests';
import { FETCH_GEO_DATA_BY_ID, RequestActions } from './actions';

export type RequestsState = { fetch_geo_data: any };

const initialState = { fetch_geo_data: null };

export const requests = (state = initialState, action: RequestActions) => {
  switch (action.type) {
    case success(FETCH_GEO_DATA_BY_ID):
      return {
        ...state,
        fetch_geo_data: action.response.data,
      };
    default:
      return state;
  }
};
