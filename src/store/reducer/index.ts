import { combineReducers } from 'redux';
import commonSlice from '../slices/common';
import authSlice from '../slices/auth';
import { boardApi } from '~/api/board';
import { monsterApi } from '~/api/monster';
import { commentApi } from '~/api/comment';
import { authApi } from '~/api/auth';

const rootReducer = combineReducers({
  // API REDUCER
  [monsterApi.reducerPath]: monsterApi.reducer,
  [boardApi.reducerPath]: boardApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  // SLICE REDUCER
  common: commonSlice.reducer,
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
