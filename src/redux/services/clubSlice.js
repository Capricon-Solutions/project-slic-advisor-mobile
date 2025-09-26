import {baseApi} from './api';

export const clubSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getClub: builder.query({
      query: userCode => {
        const url = `club/GetTheClubSelection/${userCode}`;

        return url;
      },
    }),
    getNextClub: builder.query({
      query: userCode => `club/GetNextClubYearDetails/${userCode}`,
    }),
  }),
});

// Export hooks
export const {useGetNextClubQuery, useGetClubQuery} = clubSlice;
