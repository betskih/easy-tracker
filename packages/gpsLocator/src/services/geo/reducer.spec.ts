import deepFreeze from 'deep-freeze';
import { geo, IGeoState } from './reducer';
import { SET_NEW_LOCATION } from './actions';

describe('geo reducer test', () => {
  const initialState: IGeoState = {
    lastIndex: 0,
    lastAmount: 0,
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
    expect(newState).toStrictEqual({ lastIndex: 0, lastAmount: 1, [0]: [location] });
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
