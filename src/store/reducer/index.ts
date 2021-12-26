import { combineReducers } from 'redux';
import { monsterApi } from '~/api/monster';
import commonSlice from '../slices/common';

const rootReducer = combineReducers({
  [monsterApi.reducerPath]: monsterApi.reducer,
  common: commonSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
