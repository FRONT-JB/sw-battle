import { authApi } from './../../api/auth';
import { commentApi } from './../../api/comment';
import { combineReducers } from 'redux';
import { boardApi } from '~/api/board';
import { monsterApi } from '~/api/monster';
import commonSlice from '../slices/common';
import authSlice from '../slices/auth';

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
