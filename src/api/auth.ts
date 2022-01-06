import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<
      { token: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => {
        return {
          url: '/signin',
          method: 'POST',
          body: { username, password },
        };
      },
    }),
    signUp: builder.mutation<void, { username: string; password: string }>({
      query: ({ username, password }) => {
        return {
          url: '/signup',
          method: 'POST',
          body: { username, password },
        };
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
