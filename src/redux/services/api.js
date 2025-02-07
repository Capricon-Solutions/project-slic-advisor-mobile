import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://122.255.4.181:2001/api/', // Replace with your API URL
    prepareHeaders: (headers, {getState}) => {
      const token = getState()?.auth?.token; // Adjust according to your state
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({
    getBranches: builder.query({
      query: () => 'agent/getBranches',
    }),

    addBranches: builder.mutation({
      query: newPlant => ({
        url: 'agent/getBranches',
        method: 'POST',
        body: newPlant,
      }),
    }),
  }),
});

// Export auto-generated hooks
export const {useGetBranchesQuery, useAddBranchesMutation} = api;
