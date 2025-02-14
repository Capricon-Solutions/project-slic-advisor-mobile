import {baseApi} from './api';

export const contactSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBranches: builder.query({
      query: () => 'agent/getBranches',
    }),

    getDepartment: builder.query({
      query: () => 'agent/getMotorContacts',
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
  useGetDepartmentQuery,
} = contactSlice;
