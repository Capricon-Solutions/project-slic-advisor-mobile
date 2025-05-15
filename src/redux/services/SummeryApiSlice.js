import {createSlice} from '@reduxjs/toolkit';
import {baseApi} from './api';

export const SummeryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // kpiSummery
    kpiSummery: builder.query({
      query: ({month, regionName}) => {
        const encodedRegion = encodeURIComponent(regionName);
        const url = `general/getRegionalKpiSummary/${encodedRegion}?month=${month}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // ClassSummery
    ClassSummery: builder.query({
      query: ({month, regionName}) => {
        const encodedRegion = encodeURIComponent(regionName);
        const url = `general/getRegionalClassSummary/${encodedRegion}?year=2025&month=${month}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // DuesSummery
    DuesSummery: builder.query({
      query: ({month, regionName}) => {
        const encodedRegion = encodeURIComponent(regionName);
        const url = `general/getGeneralRegionalDueSummary/${encodedRegion}?year=2025&month=${month}`;
        console.log('Fetching Notifications from:', url);
        return url;
      },
    }),

    // RegionalSummery
    RegionalSummery: builder.query({
      query: ({month}) => {
        const url = `general/getRegionalSummary/${month}`;
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
  useDuesSummeryQuery,
  useRegionalSummeryQuery,
} = SummeryApi;

