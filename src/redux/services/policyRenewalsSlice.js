import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  motorRenewalsResponse: {
    data: {
      tableData: [
        {
          id: 1,
          date: '01/02/2024',
          name: 'H G R L K Kamal',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 2,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 3,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 4,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 5,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 6,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 7,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
      ],
    },
  },

  nonMotorRenewalsResponse: {
    data: {
      tableData: [
        {
          id: 1,
          date: '01/02/2024',
          name: 'H G R L K Kamal',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 2,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 3,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 4,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
        {
          id: 5,
          date: '01/02/2024',
          name: 'H G R L K RANAVIRA',
          vehicleNo: 'K L W 2353',
          policyNo: '325236346436',
          ncb: '62',
          sum: '23254325',
          premiumAmount: '2423533',
          status: 'Completed',
        },
      ],
    },
  },
};

export const motorRenewalsSlice = createSlice({
  name: 'motorRenewalsSlice',
  initialState,
  reducers: {
    GetmotorRenewalsResponse: (state, action) => {
      state.motorRenewalsResponse = action.payload;
    },
    GetnonMotorRenewalsResponse: (state, action) => {
      state.nonMotorRenewalsResponse = action.payload;
    },
  },
});

export const {GetmotorRenewalsResponse, GetnonMotorRenewalsResponse} =
  motorRenewalsSlice.actions;

export default motorRenewalsSlice.reducer;
