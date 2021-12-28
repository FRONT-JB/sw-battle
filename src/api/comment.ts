import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '~/types/comment';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/comment`,
  }),
  endpoints: (builder) => ({
    getCommentByBoardId: builder.query<Comment[], number | undefined>({
      query: (id: number) => `/board/${id}`,
    }),
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: '',
        method: 'POST',
        body: comment,
      }),
    }),
  }),
});

export const { useGetCommentByBoardIdQuery, useCreateCommentMutation } =
  commentApi;