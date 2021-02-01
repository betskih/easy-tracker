import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import axios from 'axios';
import { createLogger } from 'redux-logger';
import createSagaMiddlware from 'redux-saga';
import { createDriver } from 'redux-saga-requests-axios';
import { handleRequests } from 'redux-saga-requests';
import { all, spawn } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import { geoSaga } from '../services/geoIds/saga';
import rootReducer from './root-reducer';


const logger = createLogger({ diff: true, collapsed: true });
const saga = createSagaMiddlware();

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const configureStore = () => {
  const { requestsSagas } = handleRequests({
    driver: createDriver(axios.create({ baseURL: 'http://localhost:8082' })),
  });
  const store = createStore(persistedReducer, applyMiddleware(logger, saga));
  const persistor = persistStore(store);

  function* rootSaga() {
    yield all(requestsSagas);
    yield spawn(geoSaga);
  }

  saga.run(rootSaga);
  return {store, persistor};
};
