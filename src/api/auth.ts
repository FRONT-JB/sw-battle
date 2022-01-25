import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from '~/types/user';
import { RootState } from '~/store/reducer';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    signIn: builder.mutation<
      { token: string; role: string },
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
    getUsers: builder.query<{ current: UserInfo[]; pending: UserInfo[] }, void>(
      {
        query: () => '/users',
        transformResponse: (res: UserInfo[]) => {
          const currentlyUsers = res
            .filter((user) => user.role !== 'Pending')
            .sort((a, b) =>
              a.role.toLowerCase() < b.role.toLowerCase() ? -1 : 0,
            );
          const pendingUsers = res.filter((user) => user.role === 'Pending');
          return { current: currentlyUsers, pending: pendingUsers };
        },
        providesTags: ['auth'],
      },
    ),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => {
        return {
          url: `/user/${userId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['auth'],
    }),
    changeRole: builder.mutation<void, Partial<UserInfo>>({
      query: (changeInfo) => {
        return {
          url: '/role',
          method: 'PATCH',
          body: changeInfo,
        };
      },
      invalidatesTags: ['auth'],
    }),
    checkUserRole: builder.query<{ role: string }, number | undefined>({
      query: (userId) => {
        return {
          url: `/role/${userId}`,
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetUsersQuery,
  useSignInMutation,
  useChangeRoleMutation,
  useDeleteUserMutation,
  useCheckUserRoleQuery,
} = authApi;
