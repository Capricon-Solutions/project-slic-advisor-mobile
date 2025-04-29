import { baseApi } from './api';

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHelp: builder.query({
      query: () => 'help',  // Uses baseUrl from baseApi
    }),

    userLogin: builder.mutation({
      query: (body) => {
        const finalUrl = 'https://oo4843l2ch.execute-api.ap-southeast-1.amazonaws.com/BellSalesLogin/api/auth/login'; // Hardcoded URL for login
        console.log(`Final URL for userLogin: ${finalUrl}`); // Log the final URL

        return {
          url: finalUrl,  // This will use the hardcoded full URL for login
          method: 'POST',
          body: body,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        const finalUrl = 'https://oo4843l2ch.execute-api.ap-southeast-1.amazonaws.com/BellSalesLogin/api/auth/change-password'; // Hardcoded URL for login
        console.log(`Final URL for userLogin: ${finalUrl}`); // Log the final URL

        return {
          url: finalUrl,  // This will use the hardcoded full URL for login
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useUserLoginMutation,
  useGetHelpQuery,
  useChangePasswordMutation
} = loginApi;
