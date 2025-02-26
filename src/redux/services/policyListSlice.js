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

        console.log('✅ Final URL:', url); // Check the final URL

        return url;
      },
    }),
  }),
});

// Export hooks
export const {useGetPolicyListQuery} = policyListSlice;
