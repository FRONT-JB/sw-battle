import { combineReducers } from 'redux';
import commonSlice from '../slices/common';

const rootReducer = combineReducers({
  common: commonSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
