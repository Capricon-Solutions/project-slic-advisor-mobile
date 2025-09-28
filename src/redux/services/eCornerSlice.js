import { baseApi } from './api';

export const eCornerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getGetGogreenDetailsAll: builder.query({
      query: userCode => {
        const url = `agent/GetGogreenDetailsAll/${userCode}`;
        return url;
      },
    }),
    getEDocument: builder.query({
      query: () => {
        const url = `print/edocuments`;
        return url;
      },
    }),
    getcommissionStatement: builder.mutation({
      query: ({ selectedDate, selectedType, selectedCode }) => {
        const finalUrl = `print/getCommisionStatementlink/${selectedCode}?yearMonth=${selectedDate}&stype=${selectedType}`;

        return {
          url: finalUrl,
          method: 'GET',
        };
      },
    }),
  }),
});

// Export hooks
export const {
  useGetGetGogreenDetailsAllQuery,
  useGetcommissionStatementMutation,
  useGetEDocumentQuery,
} = eCornerSlice;
