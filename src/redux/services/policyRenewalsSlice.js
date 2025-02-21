import {baseApi} from './api';

console.log('working');

export const motorRenewalsSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getmotorRenewalsList: builder.query({
      query: ({id, fromDate, toDate}) =>
        `agent/getMotorRenewals/${id}?fromDate=${fromDate}&toDate=${toDate}`,
    }),

    getnonMotorRenewalsList: builder.query({
      query: ({id, fromDate, toDate}) =>
        `agent/getNonMotorRenewals/${id}?fromDate=${fromDate}&toDate=${toDate}`,
    }),
  }),
});

// Export hooks
export const {useGetmotorRenewalsListQuery, useGetnonMotorRenewalsListQuery} =
  motorRenewalsSlice;
