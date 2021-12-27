import { combineReducers } from 'redux';
import { boardApi } from '~/api/board';
import { monsterApi } from '~/api/monster';
import commonSlice from '../slices/common';

const rootReducer = combineReducers({
  // API REDUCER
  [monsterApi.reducerPath]: monsterApi.reducer,
  [boardApi.reducerPath]: boardApi.reducer,

  // SLICE REDUCER
  common: commonSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
