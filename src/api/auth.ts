import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from '~/types/user';
import { RootState } from '~/store/reducer';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    signIn: builder.mutation<any, { username: string; password: string }>({
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
    getUsers: builder.query<UserInfo[], void>({
      query: () => '/users',
      providesTags: ['auth'],
    }),
    changeRole: builder.mutation<void, Partial<UserInfo>>({
      query: (changeInfo) => {
        return {
          url: '/role',
          metod: 'PATCH',
          body: changeInfo,
        };
      },
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetUsersQuery,
  useSignInMutation,
  useChangeRoleMutation,
} = authApi;
