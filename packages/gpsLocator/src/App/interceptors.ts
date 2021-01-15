import { Action } from 'redux';
import { get } from 'lodash';
import { abort, RequestAction, error as sagaError, success } from 'redux-saga-requests';
import { put, select, take } from 'redux-saga/effects';

import { IApiRequest } from '../services/redux/ApiAction';
import { LogLevel } from './types';
import { appLog, REFRESH_TOKENS, refreshTokens } from './actions';
import { getTokenSelector } from './selectors';

const makeAuthRequest = (request: IApiRequest, access_token: string, isAuthenticated: boolean) => {
  return {
    ...request,
    url: request.url,
    headers: {
      'Content-Type': get(request, 'headers.contentType', 'application/json'),
      ...request.headers,
      ...(isAuthenticated ? { Authorization: `Bearer ${access_token}` } : {}),
    },
  };
};

export function* onRequest(request: IApiRequest, action: Action) {
  const tokens = yield select(getTokenSelector);
  const access_token = action.type === REFRESH_TOKENS ? tokens.refreshToken : tokens.token;
  const isAuthenticated = tokens.token.length > 0 && tokens.refreshToken.length > 0;
  return makeAuthRequest(request, access_token, isAuthenticated);
}

const ignore504 = false; //getFeatureFlag('ignore504');

function skipError(status: number) {
  return status === 504 && ignore504;
}

function needAuthorization(status: number, requestUrl: string) {
  return status === 401;
}

export function* onError(error: any, action: RequestAction): any {
  const status: number = error.status;
  const actionType = action.type;
  const requestUrl = get(action, 'request.url');

  yield put(appLog('API error', { error, action }, LogLevel.ERROR));
  if (skipError(status)) {
    return { error };
  }

  if (needAuthorization(status, requestUrl)) {
    //   yield put(appRoute(AUTH_ROUTES.WELCOME));
    return { error };
  }

  if (status === 403) {
    if (actionType !== REFRESH_TOKENS) {
      yield put(refreshTokens());
      yield take([success(REFRESH_TOKENS), sagaError(REFRESH_TOKENS), abort(REFRESH_TOKENS)]);
      return yield put(action);
    }
  } else if (status === 422) {
    // should be handled in reducer
  } else {
    //yield put(appRoute(AUTH_ROUTES.SOMETHING_WENT_WRONG, params));
  }
  return { error };
}

export function* onSuccess(response: any, action: Action) {
  return response;
}
