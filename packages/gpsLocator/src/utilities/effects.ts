import { Action } from 'redux';
import { select, put, delay, fork, takeEvery, spawn } from 'redux-saga/effects';
import { isAuthenticatedSelector } from '../app/selectors';
import { REFRESH_INTERVAL } from '../constants/refresh';
import { getCurrentTab } from '../services/navigation/selectors';
import { ILogToggleTabAction, LOG_TOGGLE_TAB } from '../services/navigation/actions';

export function* putAuth<A extends Action>(action: A) {
  const isAuthenticated = yield select(isAuthenticatedSelector);
  if (isAuthenticated) {
    yield put(action);
  }
}

export function* runDataUpdate<A extends Action>(
  action: A,
  routeName: string = '',
  delayValue: number = REFRESH_INTERVAL,
) {
  function* updateData() {
    while (true) {
      yield delay(delayValue);

      const currentTab = yield select(getCurrentTab);
      if (currentTab === routeName || !routeName) {
        yield putAuth(action);
      }
    }
  }

  function* onActivateTab({ routeName: activeRouteName }: ILogToggleTabAction) {
    if (activeRouteName === routeName) {
      yield putAuth(action);
    }
  }

  yield spawn(function* () {
    if (routeName) {
      yield takeEvery(LOG_TOGGLE_TAB, onActivateTab);
    }
    yield fork(updateData);
  });
}
