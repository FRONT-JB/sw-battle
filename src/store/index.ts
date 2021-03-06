import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { authApi } from '~/api/auth';
import { boardApi } from '~/api/board';
import { commentApi } from '~/api/comment';
import { monsterApi } from '~/api/monster';
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['auth'],
  blacklist: ['common', 'boardApi', 'commentApi', 'monsterApi', 'authApi'],
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const combineApiMiddleWare = [
  monsterApi.middleware,
  boardApi.middleware,
  commentApi.middleware,
  authApi.middleware,
];

const store = configureStore({
  reducer: enhancedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(combineApiMiddleWare),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
