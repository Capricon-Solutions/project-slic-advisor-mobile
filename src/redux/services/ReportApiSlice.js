import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from './api';

export const ReportApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // RmReport
    RmReport: builder.query({
      query: ({ branch }) => {
        const url = `report/rmReport?category=%7Bcategory%7D&type=%7Btype%7D&month=%7Bmonth%7D&branch=`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),



  }),
});

// Export hooks
export const {
  useRmReportQuery,

} = ReportApi;
