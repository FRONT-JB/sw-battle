import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { boardApi } from '~/api/board';
import { monsterApi } from '~/api/monster';
import rootReducer from './reducer';

const combineApiMiddleWare = [monsterApi.middleware, boardApi.middleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      combineApiMiddleWare,
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
