import { BASE_URL } from './common';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const monsterApi = createApi({
  reducerPath: 'monsterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/monsters`,
  }),
  endpoints: (builder) => ({
    getMonster: builder.query({
      query: (name: string) => `/${name}`,
    }),
  }),
});

export const { useGetMonsterQuery } = monsterApi;
