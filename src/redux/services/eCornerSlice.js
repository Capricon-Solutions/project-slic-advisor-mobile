import {baseApi} from './api';

export const eCornerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getGetGogreenDetailsAll: builder.query({
      query: userCode => {
        const url = `agent/GetGogreenDetailsAll/${userCode}`;
        console.log('Fetching URL test', url);
        return url;
      },
    }),
    getEDocument: builder.query({
      query: () => {
        const url = `print/edocuments`;
        console.log('Fetching URL test', url);
        return url;
      },
    }),
    getcommissionStatement: builder.mutation({
      query: ({selectedDate, selectedType, selectedCode}) => {
        const finalUrl = `print/getCommisionStatementlink/${selectedCode}?yearMonth=${selectedDate}&stype=${selectedType}`;
        // console.log('Final URL:', finalUrl);
        // console.log('selectedCode', selectedCode);
        // console.log('selectedDate', selectedDate);
        // console.log('selectedType', selectedType);
        // console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'GET',
          // body: body,
        };
      },
      // invalidatesTags: ['Events'],
    }),
  }),
});

// Export hooks
export const {
  useGetGetGogreenDetailsAllQuery,
  useGetcommissionStatementMutation,
  useGetEDocumentQuery,
} = eCornerSlice;
