import { baseApi } from './api';
export const policyListSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPolicyList: builder.query({
      query: ({ id, filterText }) => {

        let url = `agent/getPolicies/${id}`;
        if (filterText) {
          url += `?filterTxt=${encodeURIComponent(filterText)}`;
        }


        return url;
      },
    }),
    searchPolicies: builder.mutation({
      query: data => {
        return {
          url: 'agent/serachPolicies', // The endpoint for the POST request
          method: 'POST',
          body: data, // The body of the POST request containing the necessary parameters
        };
      },
    }),
  }),
});

// Export hooks
export const { useGetPolicyListQuery, useSearchPoliciesMutation } =
  policyListSlice;
