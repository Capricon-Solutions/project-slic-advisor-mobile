import { baseApi } from './api';

export const clubSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getClub: builder.query({
      query: () => 'club/GetTheClubSelection/902429',
    }),
    getNextClub: builder.query({
      query: () => 'club/GetNextClubYearDetails/902429',
    }),


  }),
});

// Export hooks
export const {
  useGetNextClubQuery,
  useGetClubQuery
} = clubSlice;
