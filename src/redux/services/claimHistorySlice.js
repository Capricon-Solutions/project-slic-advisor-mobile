import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  claimHistoryResponse: {
    data: [
      {
        id: 1,
        policyNumber: 'VM1113001710000480',
        voucher: 'Dr Sarath Hewage',
        intimatedOn: '2023-06-05',
        dateOfLoss: '2023-06-05',
        regDate: '2023-06-12',
        paymentType: 'Slip',
        voucherStatus: 'Paid',
        amount: '45,000.00',
        paidDate: '2023-07-07',
        voucherNo: 'M/23/010/CH/118354',
      },
      {
        id: 2,
        policyNumber: 'VM1113001710000480',
        voucher: 'Dr Sarath Hewage',
        intimatedOn: '2023-06-05',
        dateOfLoss: '2023-06-05',
        regDate: '2023-06-12',
        paymentType: 'Slip',
        voucherStatus: 'Paid',
        amount: '45,000.00',
        paidDate: '2023-07-07',
        voucherNo: 'M/23/010/CH/118354',
      },
      {
        id: 3,
        policyNumber: 'VM1113001710000480',
        voucher: 'Dr Sarath Hewage',
        intimatedOn: '2023-06-05',
        dateOfLoss: '2023-06-05',
        regDate: '2023-06-12',
        paymentType: 'Slip',
        voucherStatus: 'Paid',
        amount: '45,000.00',
        paidDate: '2023-07-07',
        voucherNo: 'M/23/010/CH/118354',
      },
    ],
  },
};

export const claimHistorySlice = createSlice({
  name: 'claimHistorySlice',
  initialState,
  reducers: {
    GetclaimHistoryResponse: (state, action) => {
      state.claimHistoryResponse = action.payload;
    },
  },
});

export const {GetclaimHistoryResponse} = claimHistorySlice.actions;

export default claimHistorySlice.reducer;
