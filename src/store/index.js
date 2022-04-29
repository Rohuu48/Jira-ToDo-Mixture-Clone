import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducer/index';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);

if (
  process.env.NODE_ENV === 'development' ||
  window.localStorage.getItem('logger')
) {
  const logger = require('redux-logger').default;
  middleware.push(logger);
}

export const store = createStore(pReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

export const dummyStore = createStore((store) => {
  return {
    ...store
  };
});
