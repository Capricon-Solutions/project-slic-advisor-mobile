import {baseApi} from './api';

export const profilePicSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getImage: builder.query({
      query: ({id}) => {
        const url = `image/get/${id}`;
        console.log('getImage URL: kkkkkktest', url);
        return url;
      },
      providesTags: ['ProfilePic'],
    }),

    getImageUrl: builder.query({
      query: ({url}) => {
        console.log('Final API URL: runs fffffff', url); // Log the final URL inside the query function
        return url;
      },
    }),
    addImage: builder.mutation({
      query: ({agencyCode, imageFile}) => {
        const formData = new FormData();
        formData.append('AgencyCode', agencyCode); // Add agency code as text
        formData.append('ImageFile', imageFile); // Add image file
        console.log('AgencyCodeccccccccccccccccccccc', agencyCode);
        console.log('ImageFilecccccccccccccc  kkkkkktest', imageFile);
        return {
          url: 'image/upload',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['ProfilePic'],
    }),
  }),
});

// Export hooks
export const {useAddImageMutation, useGetImageQuery, useLazyGetImageUrlQuery} =
  profilePicSlice;
