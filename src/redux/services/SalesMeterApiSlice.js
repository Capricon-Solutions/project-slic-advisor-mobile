import {createSlice} from '@reduxjs/toolkit';
import {baseApi} from './api';

export const SalesMeterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // salesIncome
    salesIncome: builder.query({
      query: ({id}) => {
        const url = `salesIncome/getIncome/${id}`;
        console.log('Fetching  from:', url);
        return url;
      },
      providesTags: ['SetTarget'],
    }),
    // getAgentCurrentMonthAchievement
    getAgentCurrentMonthAchievement: builder.query({
      query: ({id}) => {
        const url = `agent/getAgentCurrentMonthAchievement/${id}`;
        console.log('Fetching  from:', url);
        return url;
      },
      providesTags: ['SetTarget'],
    }),
    // getAgentCurrentMonthAchievement
    getAgentCurrentMonthIncome: builder.query({
      query: ({id}) => {
        const url = `agent/getAgentCurrentMonthIncome/${id}`;
        console.log('Fetching  from:', url);
        return url;
      },
    }),

    // getCurrentMonthRank
    getCurrentMonthRank: builder.query({
      query: ({id}) => {
        const url = `agent/getCurrentMonthRank/${id}`;
        console.log('Fetching  from: getCurrentMonthRank', url);
        return url;
      },
    }),
    // getCurrentMonthRank
    getRMSummery: builder.query({
      query: ({month, region}) => {
        const url = `general/getGeneralTotalRm/${region}?month=${month}`;
        console.log('Fetching  from: getRMSummery', url);
        return url;
      },
    }),

    setTarget: builder.mutation({
      query: ({body}) => {
        console.log('POST request payload:', body);
        return {
          url: 'salesIncome/setTarget',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['SetTarget'],
    }),
  }),
});

// Export hooks
export const {
  useGetAgentCurrentMonthAchievementQuery,
  useSalesIncomeQuery,
  useGetAgentCurrentMonthIncomeQuery,
  useSetTargetMutation,
  useGetCurrentMonthRankQuery,
  useGetRMSummeryQuery,
} = SalesMeterApi;
