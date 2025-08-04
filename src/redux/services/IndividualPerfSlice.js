import {createSlice} from '@reduxjs/toolkit';
import {baseApi} from './api';

export const IndividualPerfApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    GetindividualPerf: builder.query({
      query: ({id, fromDate, toDate}) => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);

        const finalUrl = `agent/getAgentPerfomanceByDate/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);

        return finalUrl;
      },
    }),
    GetteamPerf: builder.query({
      query: ({id, fromDate, toDate}) => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
        const finalUrl = `agent/getTeamPerfomanceByMonth/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);
        return finalUrl;
      },
    }),
    // GetteamCurrentPerfMonth: builder.query({
    //   query: ({ id }) => {
    //     // console.log('From Date:', fromDate);
    //     // console.log('To Date:', toDate);
    //     const finalUrl = `agent/getAgentsPerfomanceByMonth/${id}`;
    //     console.log('Final URL:', finalUrl);
    //     return finalUrl;
    //   },
    // }),
    GetteamCurrentPerfMonth: builder.query({
      query: ({id}) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const fromDate = firstDay.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        const toDate = lastDay.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        const finalUrl = `agent/getAgentsPerfomanceByMonth/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);

        return finalUrl;
      },
    }),
    GetteamCurrentPerfYear: builder.query({
      query: ({id}) => {
        // console.log('From Date:', fromDate);
        // console.log('To Date:', toDate);
        const finalUrl = `agent/getAgentsPerfomanceByYear/${id}`;
        console.log('Final URL:', finalUrl);
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
