import { baseApi } from './api';

export const eCornerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getGetGogreenDetailsAll: builder.query({
      query: () => {
        const url = `agent/GetGogreenDetailsAll/905717`;
        console.log("Fetching URL test", url);
        return url;
      },
    }),


    // getLeadById: builder.query({
    //   query: id => `planner/GetPlannerLeadById?Id=${id}`,
    // }),


    // activityCreation: builder.mutation({
    //   query: body => {
    //     const finalUrl = `planner/addPlannerActivity/905717`;
    //     console.log('Final URL:', finalUrl);
    //     console.log('Final body:', body);

    //     return {
    //       url: finalUrl,
    //       method: 'POST',
    //       body: body,
    //     };
    //   },
    //   invalidatesTags: ['Events'],
    // }),



  }),
});

// Export hooks
export const {
  useGetGetGogreenDetailsAllQuery
} = eCornerSlice;
