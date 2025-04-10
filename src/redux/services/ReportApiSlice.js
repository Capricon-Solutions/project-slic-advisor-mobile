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
    // MarketingReport
    MarketingReport: builder.query({
      query: ({ branch }) => {
        const url = `report/meReport?category=ss&reportType=ss&month=3&role=ss`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // AdvisorReport
    AdvisorReport: builder.query({
      query: ({ branch }) => {
        const url = `report/advisorReport?category=ss&type=ss&month=3&role=ss`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // TeamLeaderReport
    TeamLeaderReport: builder.query({
      query: ({ branch }) => {
        const url = `report/teamLeaderReport?category=ss&reportType=ss&month=3&role=ss`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // DirectReport
    DirectReport: builder.query({
      query: ({ branch }) => {
        const url = `report/directReport?category=%7Bcategoty%7D&reportType=%7BreportType%7D&month=%7Bmonth%7D`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),
  }),
});

// Export hooks
export const {
  useRmReportQuery,
  useMarketingReportQuery,
  useDirectReportQuery,
  useTeamLeaderReportQuery,
  useAdvisorReportQuery

} = ReportApi;
