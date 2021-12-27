import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from '~/types/board';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/boards`,
  }),
  endpoints: (builder) => ({
    getBoardList: builder.query<Board[], void>({
      query: () => '',
      transformResponse: (res: Board[]) => {
        return [...res].sort((a, b) => b.id - a.id);
      },
    }),

    createBoard: builder.mutation<Board, Omit<Board, 'id'>>({
      query: (board) => ({
        url: '',
        method: 'POST',
        body: board,
      }),
    }),
  }),
});

export const { useGetBoardListQuery, useCreateBoardMutation } = boardApi;
