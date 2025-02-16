import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  IndividualStatResponse: {
    data: {
      tableData: [
        {
          first: 'Premium for November',
          Renewals: 'Gen. Collec. - Cash',
          New: '182,205.78',
          Refunds: '15,368.00',
          Endorsements: '15,368.00',
          Total: '15,36.00',
        },
        {
          first: 'Premium for 2024',
          Renewals: 'Gen. Collec. - Cash',
          New: '182,205.78',
          Refunds: '15,368.00',
          Endorsements: '15,368.00',
          Total: '15,368.00',
        },
        {
          first: 'No. of Policies for November',
          Renewals: 'Gen. Collec. - Cash',
          New: '182,205.78',
          Refunds: '15,368.00',
          Endorsements: '15,368.00',
          Total: '15,368.00',
        },
        {
          first: 'No. of Policies for 2024',
          Renewals: 'Gen. Collec. - Cash',
          New: '182,205.78',
          Refunds: '15,368.00',
          Endorsements: '15,368.00',
          Total: '15,368.00',
        },
        {
          first: 'Premium for 2024',
          Renewals: 'Gen. Collec. - Cash',
          New: '182,205.78',
          Refunds: '15,368.00',
          Endorsements: '15,368.00',
          Total: '15,368.00',
        },
      ],
    },
  },
};

export const individualStatSlice = createSlice({
  name: 'individualStatSlice',
  initialState,
  reducers: {
    GetindividualStatResponse: (state, action) => {
      state.IndividualStatResponse = action.payload;
    },
  },
});

export const {GetindividualStatResponse} = individualStatSlice.actions;

export default individualStatSlice.reducer;
