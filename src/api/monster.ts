import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ElementTypes } from '~/types/monster';
import { BASE_URL } from './common';

export const monsterApi = createApi({
  reducerPath: 'monsterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/monsters`,
  }),
  endpoints: (builder) => ({
    getMonster: builder.query({
      query: (page: number, star?: number, element?: ElementTypes) =>
        `/?page=${page}${star ? `&natural_stars=${star}` : ''}${
          element ? `&element=${element}` : ''
        }`,
    }),
  }),
});

export const { useGetMonsterQuery } = monsterApi;
