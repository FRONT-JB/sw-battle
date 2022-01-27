import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../reducer';
import jwtParser from 'jwt-decode';
import { authApi } from '~/api/auth';

const AUTH_SLICE = 'AUTH' as const;

export interface AuthUser {
  id: number;
  username: string;
  role: 'Admin' | 'User' | 'Pending';
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState,
  reducers: {
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload: { token } }) => {
        const decodeJWT: AuthUser = jwtParser(token);
        state.user = decodeJWT;
        state.token = token;
      },
    );
  },
});
export const { setLogout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export const authUserSelector = createSelector(
  [authSelector],
  ({ user }: AuthState) => user,
);

export const tokenSelector = createSelector(
  [authSelector],
  ({ token }) => token,
);
export default authSlice;
