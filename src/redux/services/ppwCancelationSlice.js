import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ppwCancelationReminderResponse: {
    data: {
      tableData: [
        {
          id: 1,
          policyNo: '325236346436',
          vehicleNo: 'K L W 2353',
          costumorName: 'H G R L K RANAVIRA',
          debitAmount: '334324',
          paymentDate: '01/02/2024',
          dueDate: '01/02/2024',
        },
        {
          id: 2,
          policyNo: '325236346436',
          vehicleNo: 'K L W 2353',
          costumorName: 'H G R L K RANAVIRA',
          debitAmount: '334324',
          paymentDate: '01/02/2024',
          dueDate: '01/02/2024',
        },
        {
          id: 3,
          policyNo: '325236346436',
          vehicleNo: 'K L W 2353',
          costumorName: 'H G R L K RANAVIRA',
          debitAmount: '334324',
          paymentDate: '01/02/2024',
          dueDate: '01/02/2024',
        },
      ],
    },
  },

  ppwCancelationCancelledResponse: {
    data: {
      tableData: [
        {
          id: 1,
          policyNo: '325236346436',
          vehicleNo: 'K L W 2353',
          costumorName: 'H G R L K RANAVIRA',
          debitAmount: '334324',
          paymentDate: '01/02/2024',
          cancelledDate: '01/12/2024',
          reInstateDate: '01/12/2024',
          dueDate: '01/12/2024',
        },
        {
          id: 2,
          policyNo: '325236346436',
          vehicleNo: 'K L W 2353',
          costumorName: 'H G R L K RANAVIRA',
          debitAmount: '334324',
          paymentDate: '01/02/2024',
          cancelledDate: '01/12/2024',
          reInstateDate: '01/12/2024',
          dueDate: '01/12/2024',
        },
        {
          id: 3,
          policyNo: '325236346436',
          vehicleNo: 'K L W 2353',
          costumorName: 'H G R L K RANAVIRA',
          debitAmount: '334324',
          paymentDate: '01/02/2024',
          cancelledDate: '01/12/2024',
          reInstateDate: '01/12/2024',
          dueDate: '01/12/2024',
        },
      ],
    },
  },
};

export const ppwCancelationSlice = createSlice({
  name: 'ppwCancelationSlice',
  initialState,
  reducers: {
    GetmotorRenewalsResponse: (state, action) => {
      state.ppwCancelationReminderResponse = action.payload;
    },
    GetnonMotorRenewalsResponse: (state, action) => {
      state.ppwCancelationCancelledResponse = action.payload;
    },
  },
});

export const {GetmotorRenewalsResponse, GetnonMotorRenewalsResponse} =
  ppwCancelationSlice.actions;

export default ppwCancelationSlice.reducer;
