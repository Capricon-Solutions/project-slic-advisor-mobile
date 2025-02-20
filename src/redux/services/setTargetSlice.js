import {baseApi} from './api';

export const setTargetSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    setTarget: builder.mutation({
      query: body => ({
        url: 'path/to/your/target/endpoint',
        method: 'POST',
        headers: {
          'x-api-key': 'your-api-key-here',
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
  }),
});

// Export hooks
export const {
  useSetTargetMutation, // Replace with the actual hook for setTarget mutation
} = setTargetSlice;
