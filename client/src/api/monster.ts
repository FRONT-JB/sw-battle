import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ElementTypes } from '~/types/monster';

const PROXY = process.env.PROXY;
const BASE_URL = `${PROXY}/https://swarfarm.com/api/v2`;

export const monsterApi = createApi({
  reducerPath: 'monsterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/monsters`,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
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
