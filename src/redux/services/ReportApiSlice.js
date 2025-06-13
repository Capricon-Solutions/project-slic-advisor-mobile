import {createSlice} from '@reduxjs/toolkit';
import {baseApi} from './api';

export const ReportApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // RmReport
    RmReport: builder.query({
      query: ({branch, region, startMonth, year, endMonth, type, value}) => {
        const url = `report/rmReport?year=${year}&type=${type}&startMonth=${startMonth}&endMonth=${endMonth}&region=${region}&branch=${branch}&dept=${type}`;
        // http://api.slicgeneral.com:2001/api/report/rmReport?year=2025&startMonth=3&endMonth=3&region=Western%203&dept=ALL
        console.log('Fetching Report from:', url);

        return url;
      },
    }),
    // MarketingReport
    MarketingReport: builder.query({
      query: ({branch, month, type}) => {
        const url = `report/meReport?category=ss&reportType=ss&month=${month}&role=${branch}`;
        console.log('Fetching Report from:', url);
        return url;
      },
    }),

    // AdvisorReport
    AdvisorReport: builder.query({
      query: ({branch, month, type}) => {
        const url = `report/advisorReport?branchCode=26&year=2025&startMonth=${month}&endMonth=${month}dept=${branch}`;
        console.log('Fetching Report from:', url);
        return url;
      },
    }),

    // TeamLeaderReport
    TeamLeaderReport: builder.query({
      query: ({branch, year, dept, startMonth, endMonth, type}) => {
        const url = `report/teamLeaderReport?branchCode=${branch}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${dept}&reportType=${type}`;
        //  `report/teamLeaderReport?category=ss&reportType=ss&month=${month}&role=${branch}`;
        console.log('Fetching Report from:', url);
        return url;
      },
    }),

    // DirectReport
    DirectReport: builder.query({
      query: ({branch, month, type}) => {
        const url = `report/directReport?category=%7Bcategoty%7D&reportType=%7BreportType%7D&month=${month}Bmonth%7D`;
        console.log('Fetching Report from:', url);
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
