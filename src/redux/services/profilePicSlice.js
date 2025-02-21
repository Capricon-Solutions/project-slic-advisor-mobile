import {baseApi} from './api';

export const profilePicSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getImage: builder.query({
      query: ({id}) => `image/get/${id}`,
    }),

    addImage: builder.mutation({
      query: newImage => ({
        url: 'image/upload',
        method: 'POST',
        body: newImage,
      }),
    }),
  }),
});

// Export hooks
export const {useAddImageMutation, useGetImageQuery} = profilePicSlice;
