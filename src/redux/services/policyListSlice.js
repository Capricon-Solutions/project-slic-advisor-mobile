import {baseApi} from './api';
console.log('workiing');
export const policyListSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPolicyList: builder.query({
      query: () => 'agent/getPolicies/893152',
    }),
  }),
});

// Export hooks
export const {useGetPolicyListQuery} = policyListSlice;
