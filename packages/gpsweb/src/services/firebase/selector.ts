import { get } from 'lodash';
// import { createSelector } from 'reselect';
import { IStoreState } from '../../app/root-reducer';
import { FireBaseState } from './reducer';

export const getFirebaseSelector = (state: IStoreState): FireBaseState => get(state, 'firebase');

// export const getAuthSelector = createSelector(getFirebaseSelector, (state) => state.auth);
