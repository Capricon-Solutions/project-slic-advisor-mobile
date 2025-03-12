import { baseApi } from './api';

export const clubSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getClub: builder.query({
      query: () => 'club/GetTheClubSelection/902429',
    }),

  }),
});

// Export hooks
export const {

  useGetClubQuery
} = clubSlice;
