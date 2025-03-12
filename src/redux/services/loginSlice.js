import { baseApi } from './api';

export const loginSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHelp: builder.query({
      query: () => 'help',
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

// Export hooks
export const {
  useGetBranchesQuery,
  useAddBranchesMutation,
  useGetHelpQuery
} = loginSlice;
