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
    getEDocument: builder.query({
      query: () => {
        const url = `print/edocuments`;
        console.log("Fetching URL test", url);
        return url;
      },
    }),
    getcommissionStatement: builder.mutation({
      query: (selectedDate, selectedType, selectedCode) => {
        const finalUrl = `print/getCommisionStatement/${selectedCode}?yearMonth=${selectedDate}&stype=${selectedType}`;
        console.log('Final URL:', finalUrl);
        // console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'GET',
          // body: body,
        };
      },
      // invalidatesTags: ['Events'],
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
  useGetGetGogreenDetailsAllQuery,
  useGetcommissionStatementMutation,
  useGetEDocumentQuery
} = eCornerSlice;
