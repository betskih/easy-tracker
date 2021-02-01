import { get } from 'lodash';
import { createSelector } from 'reselect';
import { IStoreState } from '../../app/root-reducer';
import { FireBaseState } from './reducer';
import { UserInfo } from './types';

export const getFirebaseSelector = (state: IStoreState): FireBaseState => get(state, 'firebase');

export const isUserSignedIn = createSelector(getFirebaseSelector, (state) => state.isSignedIn);

export const getUserInfo = createSelector(
  getFirebaseSelector,
  (state): UserInfo => {
    const userData = get(state, 'firebaseUser');
    if (userData) {
      return {
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        uid: userData.uid,
      };
    } else return {} as UserInfo;
  },
);
