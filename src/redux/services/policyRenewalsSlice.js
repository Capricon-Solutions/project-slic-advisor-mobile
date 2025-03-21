import { baseApi } from './api';

console.log('working');

export const motorRenewalsSlice = baseApi.injectEndpoints({
  endpoints: builder => ({

    getprintMotorRenewalsList: builder.query({
      query: ({ id, fromDate, toDate }) => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);

        const finalUrl = `agent/getPrintMotorRenewal/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);

        return finalUrl;
      },
    }),


    getmotorRenewalsList: builder.query({
      query: ({ id, fromDate, toDate }) => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);

        const finalUrl = `agent/getMotorRenewals/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);

        return finalUrl;
      },
    }),

    getnonMotorRenewalsList: builder.query({
      query: ({ id, fromDate, toDate }) => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);

        const finalUrl = `agent/getNonMotorRenewals/${id}?fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL:', finalUrl);

        return finalUrl;
      },
    }),
  }),
});

// Export hooks
export const { useGetmotorRenewalsListQuery, useGetnonMotorRenewalsListQuery, useGetprintMotorRenewalsListQuery } =
  motorRenewalsSlice;
