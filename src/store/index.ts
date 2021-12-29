import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { boardApi } from '~/api/board';
import { commentApi } from '~/api/comment';
import { monsterApi } from '~/api/monster';
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['common'],
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const combineApiMiddleWare = [
  monsterApi.middleware,
  boardApi.middleware,
  commentApi.middleware,
];

const store = configureStore({
  reducer: enhancedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      combineApiMiddleWare,
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
