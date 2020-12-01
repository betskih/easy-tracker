import { Action } from 'redux';
import { get } from 'lodash';
import { RequestAction } from 'redux-saga-requests';
import { put } from 'redux-saga/effects';

import { IApiRequest } from '../services/redux/ApiAction';
import { LogLevel } from './types';
import { appLog } from './actions';

const makeAuthRequest = (
  request: IApiRequest,
  access_token: string,
  id_token: string,
  isAuthenticated: boolean,
) => {
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
  const access_token = '';
  const id_token = '';
  // yield select(appSelector);
  const isAuthenticated = true;
  // yield select(isAuthenticatedSelector);
  return makeAuthRequest(request, access_token, id_token, isAuthenticated);
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
  // const message = get(error, 'data.message');
  // const detailedMessage = get(error, 'data.detailedMessage');
  // const timestamp = get(error, 'data.timestamp');
  // const method = get(action, 'request.method', 'GET');
  // const url = error.url;
  // const params = { status, message, url, timestamp, detailedMessage, method };
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
    // yield put(appRoute(AUTH_ROUTES.FORBIDDEN, params));
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
