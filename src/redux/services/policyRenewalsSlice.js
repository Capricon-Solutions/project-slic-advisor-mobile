import { baseApi } from './api';


export const motorRenewalsSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getprintMotorRenewalsList: builder.query({
      query: ({ id, fromDate, toDate }) => {
        const finalUrl = `agent/getPrintMotorRenewal/${id}?fromDate=${fromDate}&toDate=${toDate}`;

        return finalUrl;
      },
    }),

    getmotorRenewalsList: builder.query({
      query: ({ id, fromDate, toDate }) => {
        const finalUrl = `agent/getMotorRenewals/${id}?fromDate=${fromDate}&toDate=${toDate}`;

        return finalUrl;
      },
    }),

    getnonMotorRenewalsList: builder.query({
      query: ({ id, fromDate, toDate }) => {
        const finalUrl = `agent/getNonMotorRenewals/${id}?fromDate=${fromDate}&toDate=${toDate}`;

        return finalUrl;
      },
    }),
  }),
});

// Export hooks
export const {
  useGetmotorRenewalsListQuery,
  useGetnonMotorRenewalsListQuery,
  useGetprintMotorRenewalsListQuery,
} = motorRenewalsSlice;
