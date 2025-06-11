import {createSlice} from '@reduxjs/toolkit';
import {baseApi} from './api';

export const ReportApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // RmReport
    RmReport: builder.query({
      query: ({branch, selectedMonth, type, SelectedType, value}) => {
        const url = `report/rmReport?category=${value}&type=${SelectedType}&month=${selectedMonth}&branch=${branch}&dept=ALL`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),
    // MarketingReport
    MarketingReport: builder.query({
      query: ({branch, month, type}) => {
        const url = `report/meReport?category=ss&reportType=ss&month=${month}&role=${branch}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // AdvisorReport
    AdvisorReport: builder.query({
      query: ({branch, month, type}) => {
        const url = `report/advisorReport?branchCode=26&year=2025&startMonth=${month}&endMonth=${month}dept=${branch}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // TeamLeaderReport
    TeamLeaderReport: builder.query({
      query: ({branch, year, dept, startMonth, endMonth, type}) => {
        const url = `report/teamLeaderReport?branchCode=${branch}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${dept}&reportType=${type}`;
        //  `report/teamLeaderReport?category=ss&reportType=ss&month=${month}&role=${branch}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // DirectReport
    DirectReport: builder.query({
      query: ({branch, month, type}) => {
        const url = `report/directReport?category=%7Bcategoty%7D&reportType=%7BreportType%7D&month=${month}Bmonth%7D`;
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
  useAdvisorReportQuery,
} = ReportApi;
