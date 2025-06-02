import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://203.115.11.229:2003/GISalesAppApi/api/', // API base URL
    prepareHeaders: (headers, {getState}) => {
      // const token = getState()?.auth?.token;
      const token = getState()?.Profile?.token;
      console.log('token', token);
      const apiKey = '12345abcde67890fghijklmnoprstuvwxz'; // Your API key

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('x-api-key', apiKey); // Add API key in headers

      return headers;
    },
  }),
  tagTypes: ['Events', 'Trainings'],
  endpoints: () => ({}), // Empty endpoints, will be extended
});
