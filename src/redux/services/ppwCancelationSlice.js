import {baseApi} from './api';

export const ppwSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPPWCanceledList: builder.query({
      query: ({id, pType, fromDate, toDate}) => {
        const url = `agent/getPPWCancelledList/${id}?pType=${pType}&fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL (PPW Canceled List):', url); // Log the final URL
        return url;
      },
    }),

    getPPWReminderList: builder.query({
      query: ({id, pType, fromDate, toDate}) => {
        const url = `agent/getPPWReminder/${id}?pType=${pType}&fromDate=${fromDate}&toDate=${toDate}`;
        console.log('Final URL (PPW Reminder List):', url); // Log the final URL
        return url;
      },
    }),
  }),
});

// Export hooks
export const {useGetPPWCanceledListQuery, useGetPPWReminderListQuery} =
  ppwSlice;
