import {baseApi} from './api';

export const productSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProductList: builder.query({
      query: () => 'agent/getProductList',
    }),
  }),
});

// Export hooks
export const {useGetProductListQuery} = productSlice;
