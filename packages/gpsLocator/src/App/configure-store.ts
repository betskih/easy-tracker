import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { get } from 'lodash';

// import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
// import config from 'react-native-config';

// @ts-ignore
import { omitDeep } from '../utilities/omitDeep';
import { predefineNestedProperties } from '../utilities/configureStore';
import storage from './storage';

import { rootSaga } from './root-saga';
import rootReducer from './root-reducer';
import { APP_STATUS } from './types';

const omitFlags = (flags: string[], keys?: (string | number | symbol)[]) => {
  return createTransform((inboundState: any, key) => {
    if (Array.isArray(keys) && !keys.includes(key)) {
      return inboundState;
    }
    return omitDeep(inboundState, flags);
  });
};

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
  version: 12,
  migrate,
  stateReconciler: hardSet,
  transforms: [
    omitFlags(['pending']),
    predefineNestedProperties({
      app: [
        { path: 'isModalOpen', value: false },
        { path: 'appStatus', value: APP_STATUS.STARTED },
      ],
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);

// if (process.env.NODE_ENV === 'development') {
const logger = createLogger({
  collapsed: true,
  diff: true,
});
middlewares.push(logger);
// }

const enhancer = applyMiddleware(...middlewares);

const store = createStore(persistedReducer, enhancer);

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
