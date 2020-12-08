import deepFreeze from 'deep-freeze';
import { success } from 'redux-saga-requests';
import { geo, IGeoState } from './reducer';
import { SEND_GEO_DATA, SET_NEW_LOCATION } from './actions';

describe('geo reducer test', () => {
  const initialState: IGeoState = {
    lastIndex: 0,
    firstIndex: 0,
    lastAmount: 0,
    pending: 0,
    0: [],
  };
  const coords = {
    latitude: 10000,
    longitude: 20000,
    accuracy: 30000,
    altitude: 40000,
    heading: 50000,
    speed: 60000,
    altitudeAccuracy: 7,
  };
  const location = {
    timestamp: 113234231,
    coords,
  };

  it('should return initial state', () => {
    const newState = geo(undefined, {});
    expect(newState).toStrictEqual(initialState);
  });
  it('should return state with one el', () => {
    const newState = geo(deepFreeze(initialState), { type: SET_NEW_LOCATION, location });
    expect(newState).toStrictEqual({
      lastIndex: 0,
      firstIndex: 0,
      lastAmount: 1,
      pending: 0,
      [0]: [location],
    });
  });

  it('should return two branches in state', () => {
    let state;
    for (let i = 0; i < 201; i++) {
      state = geo(state, { type: SET_NEW_LOCATION, location });
    }
    expect(state.lastIndex).toEqual(1);
    expect(state.lastAmount).toEqual(1);
  });
});

describe('erase saved geo data', () => {
  const emptyState = {
    lastIndex: 0,
    firstIndex: 0,
    lastAmount: 0,
    pending: 1,
    0: [],
  };

  const oneArrayState = {
    lastIndex: 0,
    firstIndex: 0,
    lastAmount: 7,
    pending: 1,
    0: [1, 2, 3, 4, 5, 6, 7],
  };

  const multyArrayState = {
    lastIndex: 2,
    firstIndex: 0,
    lastAmount: 4,
    pending: 1,
    0: [1, 2, 3, 4, 5, 6, 7],
    1: [1, 2, 3, 4, 5, 6, 7],
    2: [1, 2, 3, 4],
  };

  it('empty state check', () => {
    const newState = geo(deepFreeze(emptyState), {
      type: success(SEND_GEO_DATA),
      data: { data: { inserted: 0 } },
    });
    expect(newState).toStrictEqual({ ...emptyState, pending: 0 });
  });

  it('one array state check: full erase ', () => {
    const newState = geo(deepFreeze(oneArrayState), {
      type: success(SEND_GEO_DATA),
      data: { data: { inserted: 7 } },
    });
    const expected = {
      lastIndex: 0,
      firstIndex: 0,
      lastAmount: 0,
      pending: 0,
      0: [],
    };
    expect(newState).toStrictEqual(expected);
  });

  it('one array state check: partial erase ', () => {
    const newState = geo(deepFreeze(oneArrayState), {
      type: success(SEND_GEO_DATA),
      data: { data: { inserted: 4 } },
    });
    const expected = {
      lastIndex: 0,
      firstIndex: 0,
      lastAmount: 3,
      pending: 0,
      0: [5, 6, 7],
    };
    expect(newState).toStrictEqual(expected);
  });

  it('multy array state check: full erase ', () => {
    const newState = geo(deepFreeze(multyArrayState), {
      type: success(SEND_GEO_DATA),
      data: { data: { inserted: 7 } },
    });
    const expected = {
      1: [1, 2, 3, 4, 5, 6, 7],
      2: [1, 2, 3, 4],
      lastIndex: 2,
      firstIndex: 1,
      lastAmount: 4,
      pending: 0,
    };
    expect(newState).toStrictEqual(expected);
  });

  it('multy array state check: partial erase ', () => {
    const newState = geo(deepFreeze(multyArrayState), {
      type: success(SEND_GEO_DATA),
      data: { data: { inserted: 6 } },
    });
    const expected = {
      0: [7],
      1: [1, 2, 3, 4, 5, 6, 7],
      2: [1, 2, 3, 4],
      lastIndex: 2,
      firstIndex: 0,
      lastAmount: 4,
      pending: 0,
    };
    expect(newState).toStrictEqual(expected);
  });
});
