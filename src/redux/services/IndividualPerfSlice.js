import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from './api';

export const IndividualPerfApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    GetindividualPerf: builder.query({
      query: ({ id, fromDate, toDate }) => {
        const finalUrl = `agent/getAgentPerfomanceByDate/${id}?fromDate=${fromDate}&toDate=${toDate}`;

        return finalUrl;
      },
    }),
    GetteamPerf: builder.query({
      query: ({ id, fromDate, toDate }) => {
        const finalUrl = `agent/getTeamPerfomanceByMonth/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        return finalUrl;
      },
    }),

    GetteamCurrentPerfMonth: builder.query({
      query: ({ id }) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const fromDate = firstDay.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        const toDate = lastDay.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        const finalUrl = `agent/getAgentsPerfomanceByMonth/${id}?fromDate=${fromDate}&toDate=${toDate}`;

        return finalUrl;
      },
    }),
    GetteamCurrentPerfYear: builder.query({
      query: ({ id }) => {
        const finalUrl = `agent/getAgentsPerfomanceByYear/${id}`;
        return finalUrl;
      },
    }),
  }),
});

// Export hooks
export const {
  useGetindividualPerfQuery,
  useGetteamCurrentPerfYearQuery,
  useGetteamCurrentPerfMonthQuery,
  useGetteamPerfQuery,
} = IndividualPerfApi;
