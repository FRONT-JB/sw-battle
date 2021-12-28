import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from '~/types/board';
import { setFilterList } from '~/store/slices/common';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/boards`,
  }),
  endpoints: (builder) => ({
    getBoardList: builder.query<Board[], void>({
      query: () => '',
      keepUnusedDataFor: 5,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const keyword = data.map((list) => list.keyword).flat();
        const flatKeyword = Array.from(new Set(keyword));
        dispatch(setFilterList(flatKeyword));
      },
      transformResponse: (res: Board[]) => {
        return [...res].sort((a, b) => b.id - a.id);
      },
    }),

    createBoard: builder.mutation<Board, Partial<Board>>({
      query: (board) => ({
        url: '',
        method: 'POST',
        body: board,
      }),
    }),
  }),
});

export const { useGetBoardListQuery, useCreateBoardMutation } = boardApi;
