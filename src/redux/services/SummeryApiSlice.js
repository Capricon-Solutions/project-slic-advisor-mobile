import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from './api';

export const SummeryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // kpiSummery
    kpiSummery: builder.query({
      query: ({ month }) => {
        const url = `general/getRegionalKpiSummary/Western 3?month=${month}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // ClassSummery
    ClassSummery: builder.query({
      query: ({ month }) => {
        const url = `general/getRegionalClassSummary/Western 3?year=2025&month=${month}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // DuesSummery
    DuesSummery: builder.query({
      query: ({ month }) => {
        const url = `general/getGeneralRegionalDueSummary/Western 3?year=2025&month=${month}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

  }),
});

// Export hooks
export const {
  useKpiSummeryQuery,
  useClassSummeryQuery,
  useDuesSummeryQuery
} = SummeryApi;
