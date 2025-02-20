import {baseApi} from './api';

console.log('working');

export const ppwSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPPWCanceledList: builder.query({
      query: ({id, pType}) => `agent/getPPWCancelledList/${id}?pType=${pType}`,
    }),

    getPPWReminderList: builder.query({
      query: ({id, pType}) => `agent/getPPWReminder/${id}?pType=${pType}`,
    }),
  }),
});

// Export hooks
export const {useGetPPWCanceledListQuery, useGetPPWReminderListQuery} =
  ppwSlice;
