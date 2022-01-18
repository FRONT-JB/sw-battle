import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from '~/types/board';
import { FilterState, setFilterList } from '~/store/slices/common';
import { RootState } from '~/store/reducer';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['board'],
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
        const flatKeyword = Array.from(new Set(keyword)).sort();
        dispatch(setFilterList(flatKeyword));
      },
      transformResponse: (res: Board[]) => {
        return [...res].sort((a, b) => b.id - a.id);
      },
      providesTags: ['board'],
    }),

    getBoardById: builder.query<Board, string | undefined>({
      query: (boardId: string) => {
        return {
          url: `/boards/${boardId}`,
        };
      },
      providesTags: ['board'],
    }),

    createBoard: builder.mutation<Board, Partial<Board>>({
      query: (board) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['board'],
    }),

    deleteBoard: builder.mutation<void, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['board'],
    }),
  }),
});

export const {
  useGetBoardListQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
