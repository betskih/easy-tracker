import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { createLogger } from 'redux-logger';
import createSagaMiddlware from 'redux-saga';
import { createDriver } from 'redux-saga-requests-axios';
import { handleRequests } from 'redux-saga-requests';
import { all, spawn } from 'redux-saga/effects';
import { geoSaga } from '../services/geoIds/saga';
import rootReducer from './root-reducer';

const logger = createLogger({ diff: true, collapsed: true });
const saga = createSagaMiddlware();
export const configureStore = () => {
  const { requestsSagas } = handleRequests({
    driver: createDriver(axios.create({ baseURL: 'http://localhost:8082' })),
  });
  const store = createStore(rootReducer, applyMiddleware(logger, saga));

  function* rootSaga() {
    yield all(requestsSagas);
    yield spawn(geoSaga);
  }

  saga.run(rootSaga);
  return store;
};
