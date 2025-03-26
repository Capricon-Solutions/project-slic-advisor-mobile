import { baseApi } from './api';

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHelp: builder.query({
      query: () => 'help',  // Uses baseUrl from baseApi
    }),

    userLogin: builder.mutation({
      query: (body) => {
        const finalUrl = 'http://122.255.4.181:2003/api/auth/login'; // Hardcoded URL for login
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
  useGetHelpQuery
} = loginApi;
