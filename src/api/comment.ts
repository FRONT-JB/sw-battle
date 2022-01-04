import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '~/types/comment';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/comment`,
  }),
  endpoints: (builder) => ({
    getCommentByBoardId: builder.query<Comment[], string>({
      query: (id: string) => `/board/${id}`,
      keepUnusedDataFor: 3,
    }),
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: '',
        method: 'POST',
        body: comment,
      }),
    }),
    deleteComment: builder.mutation<void, number>({
      query: (commentId) => ({
        url: `/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCommentByBoardIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
