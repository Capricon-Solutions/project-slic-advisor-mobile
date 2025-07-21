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
      query: ({branch, startMonth, year, endMonth, type, value}) => {
        const url = `report/meReport?branchCode=${branch}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${type}`;
        console.log('Fetching Report from:', url);
        return url;
      },
    }),
    // http://122.255.4.181:2001/api/report/meReport?branchCode=26&year=2025&startMonth=3&endMonth=3&dept=All

    // AdvisorReport
    AdvisorReport: builder.query({
      query: ({branch, startMonth, year, endMonth, type, value}) => {
        const url = `report/advisorReport?branchCode=${branch}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${type}`;
        console.log('Fetching Report from:', url);
        console.log('startMonthfff', startMonth);
        return url;
      },
    }),
    // http://122.255.4.181:2001/api/report/advisorReport?branchCode=26&year=2025&startMonth=3&endMonth=3&dept=all
    // TeamLeaderReport
    TeamLeaderReport: builder.query({
      query: ({branch, startMonth, year, endMonth, type, value}) => {
        const url = `report/teamLeaderReport?branchCode=${branch}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${type}`;
        //  `report/teamLeaderReport?category=ss&reportType=ss&month=${month}&role=${branch}`;
        console.log('Fetching Report from:', url);
        return url;
      },
    }),
    // TeamMemberReport
    TeamMemberReport: builder.query({
      query: ({year, dept, startMonth, endMonth, type, userCode}) => {
        const url = `agent/GetTMReport?agentCode=${userCode}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${dept}&reportType=${type}`;
        //  `report/teamLeaderReport?category=ss&reportType=ss&month=${month}&role=${branch}`;
        console.log('Fetching Report from:', url);
        return url;
      },
    }),

    // DirectReport
    DirectReport: builder.query({
      query: ({branch, startMonth, year, endMonth, type, value}) => {
        const url = `report/directReport?branchCode=${branch}&year=${year}&startMonth=${startMonth}&endMonth=${endMonth}&dept=${type}`;
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
  useTeamMemberReportQuery,
} = ReportApi;
