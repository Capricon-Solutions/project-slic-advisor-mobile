import { baseApi } from './api';

export const profilePicSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getImage: builder.query({
      query: ({ id }) => `image/get/${id}`,
    }),

    getImageUrl: builder.query({
      query: ({ url }) => {
        console.log("Final API URL:", url); // Log the final URL inside the query function
        return url;
      },
    }),
    addImage: builder.mutation({
      query: ({ agencyCode, imageFile }) => {
        const formData = new FormData();
        formData.append('AgencyCode', agencyCode); // Add agency code as text
        formData.append('ImageFile', imageFile); // Add image file
        console.log("AgencyCode", agencyCode);
        console.log("ImageFile", imageFile);
        return {
          url: 'image/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),

  }),
});

// Export hooks
export const { useAddImageMutation, useGetImageQuery, useLazyGetImageUrlQuery } = profilePicSlice;
