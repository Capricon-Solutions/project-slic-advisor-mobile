import { baseApi } from './api';

export const clubSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getClub: builder.query({
      query: () => 'club/GetTheClubSelection/905717',
    }),
    getNextClub: builder.query({
      query: () => 'club/GetNextClubYearDetails/905717',
    }),


  }),
});

// Export hooks
export const {
  useGetNextClubQuery,
  useGetClubQuery
} = clubSlice;
