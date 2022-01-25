import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '~/types/comment';
import { RootState } from '~/store/reducer';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/comment`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['comment'],
  endpoints: (builder) => ({
    getCommentByBoardId: builder.query<Comment[], string | undefined>({
      query: (id: string) => `/board/${id}`,
      keepUnusedDataFor: 3,
      providesTags: ['comment'],
    }),
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: '',
        method: 'POST',
        body: comment,
        invalidatesTags: ['comment'],
      }),
    }),
    deleteComment: builder.mutation<void, number>({
      query: (commentId) => ({
        url: `/${commentId}`,
        method: 'DELETE',
        invalidatesTags: ['comment'],
      }),
    }),
  }),
});

export const {
  useGetCommentByBoardIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
