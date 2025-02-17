import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  premiumPaymentResponse: {
    data: [
      {
        id: 1,
        startDate: '2023-06-05',
        endDate: '2023-06-05',
        premium: 50000,
        rcc: 40000,
        tcc: 2000,
        totalPremium: 850390,
        paid: 23550,
        noOfClaims: 3,
        paidDate: '2023-07-07',
      },
      {
        id: 2,
        startDate: '2024-06-05',
        endDate: '2023-06-05',
        premium: 50000,
        rcc: 40000,
        tcc: 2000,
        totalPremium: 850390,
        paid: 23550,
        noOfClaims: 3,
        paidDate: '2023-07-07',
      },
      {
        id: 3,
        startDate: '2025-06-05',
        endDate: '2023-06-05',
        premium: 50000,
        rcc: 40000,
        tcc: 2000,
        totalPremium: 850390,
        paid: 23550,
        noOfClaims: 3,
        paidDate: '2023-07-07',
      },
    ],
  },
};

export const premiumPaymentSlice = createSlice({
  name: 'premiumPaymentSlice',
  initialState,
  reducers: {
    GetpremiumPaymentResponse: (state, action) => {
      state.premiumPaymentResponse = action.payload;
    },
  },
});

export const {GetpremiumPaymentResponse} = premiumPaymentSlice.actions;

export default premiumPaymentSlice.reducer;
