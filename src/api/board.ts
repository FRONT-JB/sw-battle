import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from '~/types/board';
import { FilterState, setFilterList } from '~/store/slices/common';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getBoardList: builder.query<Board[], FilterState | {}>({
      query: (params) => {
        return {
          url: '/boards',
          params: params,
        };
      },
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
        url: '/boards',
        method: 'POST',
        body: board,
      }),
    }),

    deleteBoard: builder.mutation<void, number>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBoardListQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
