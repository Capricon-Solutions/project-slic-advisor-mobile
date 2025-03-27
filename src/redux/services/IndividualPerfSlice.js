import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from './api';




export const IndividualPerfApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    GetindividualPerf: builder.query({
      query: ({ id, fromDate, toDate }) => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);

        const finalUrl = `agent/getAgentPerfomanceByDate/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);

        return finalUrl;
      },
    }),
  }),
});

// Export hooks
export const { useGetindividualPerfQuery } =
  IndividualPerfApi;
