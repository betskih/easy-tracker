import { applyMiddleware, createStore, Reducer, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { connectRoutes } from 'redux-first-router';
import { get } from 'lodash';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import combineSectionReducers from 'combine-section-reducers';
import { predefineNestedProperties } from '../utilities/configureStore';
import { geo } from '../services/geo/reducer';
import page from '../navigation/pageReducer';

// @ts-ignore
import storage from './storage';

import { rootSaga } from './root-saga';
import { APP_STATUS } from './types';
import { app } from './reducer';
import { routesMap } from './routes';

const migrate = (state: any, version: number) => {
  const prevVersion = get(state, '_persist.version');
  const result = version === prevVersion ? state : rootReducer({}, { type: 'UNKNOWN' });
  return Promise.resolve(result);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'geo'],
  blacklist: [],
  version: 19,
  migrate,
  stateReconciler: hardSet,
  transforms: [
    predefineNestedProperties({
      app: [
        { path: 'isModalOpen', value: false },
        { path: 'appStatus', value: APP_STATUS.STARTED },
      ],
      geo: [{ path: 'pending', value: 0 }],
    }),
  ],
};

const firstRouter = connectRoutes(routesMap);

const rootReducer: Reducer = combineSectionReducers({
  app,
  geo,
  page,
  location: firstRouter.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);
middlewares.push(firstRouter.middleware);

// if (process.env.NODE_ENV === 'development') {
const logger = createLogger({
  collapsed: true,
  diff: true,
});
middlewares.push(logger);
// }

const enhancer = applyMiddleware(...middlewares);
const enhancers = compose(firstRouter.enhancer, enhancer);

const store = createStore(persistedReducer, enhancers);

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export function configureStore() {
  return {
    store: {
      ...store,
      runSaga: sagaMiddleware.run,
    },
    persistor,
  };
}
