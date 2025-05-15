import {baseApi} from './api';
console.log('workiing');
export const policyListSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPolicyList: builder.query({
      query: ({id, filterText}) => {
        console.log(' filterTxt value:', filterText); // Debug log for filterTxt

        let url = `agent/getPolicies/${id}`;
        if (filterText) {
          url += `?filterTxt=${encodeURIComponent(filterText)}`;
        }

        console.log('getPolicies Final URL:', url); // Check the final URL

        return url;
      },
    }),
    searchPolicies: builder.mutation({
      query: data => {
        console.log(' POST request payload:', data); // Log the request payload
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
export const {useGetPolicyListQuery, useSearchPoliciesMutation} =
  policyListSlice;
