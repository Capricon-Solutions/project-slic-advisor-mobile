// loginApi.ts
import {baseApi} from './api';

const LOGIN_BASE_URL = 'https://salesloginapi.slicgeneral.com/api/auth';

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHelp: builder.query({
      query: () => 'help', // Uses baseUrl from baseApi
    }),

    userLogin: builder.mutation({
      query: body => {
        const finalUrl = `${LOGIN_BASE_URL}/login`;
        // console.log(`Final URL for userLogin: ${finalUrl}`);

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
    }),

    changePassword: builder.mutation({
      query: body => {
        const finalUrl = `${LOGIN_BASE_URL}/change-password`;
        // console.log(`Final URL for changePassword: ${finalUrl}`);

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
    }),

    getBusinessAdvisor: builder.query({
      query: token => {
        const finalUrl = `${LOGIN_BASE_URL}/b-advisor?token=${token}`;
        // console.log(`Final URL for getBusinessAdvisor: ${finalUrl}`);
        return {
          url: finalUrl,
          method: 'GET',
        };
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useUserLoginMutation,
  useGetHelpQuery,
  useChangePasswordMutation,
  useGetBusinessAdvisorQuery,
} = loginApi;
