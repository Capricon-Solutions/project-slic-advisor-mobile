import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  policyDetailsResponse: {
    data: {
      id: 1,
      policyNumber: 'VM1113001710000480',
      insName: 'Dr.Kalahe Hewage Sarananda',
      Address: 'No.36, Wijethunga Mawatha Pilimathalawa',
      phone: '714425877',
      startDate: '2024/11/26',
      endDate: '2025/11/25',
      outstanding: '59,670,000.00',
      sumInsured: '59,670,000.00',
      refNo: '500207383',
      addCovers:
        'Basic Premium Adjustment \nModify Loading \nMultiple Rebate (20%) \nNCB (70%) \nNatural Disaster Cover',
      vehicleInfo: {
        vehicleNo: 'KX 4173',
        makeYear: '2013',
        brand: 'Toyota',
        chasisNo: 'KSP1302077303',
        engineNo: 'JKR1302077303',
        capacity: '990',
      },
    },
  },
};

export const policyDetailsSlice = createSlice({
  name: 'policyDetailsSlice',
  initialState,
  reducers: {
    GetpolicyDetailsResponse: (state, action) => {
      state.policyDetailsResponse = action.payload;
    },
  },
});

export const {GetpolicyDetailsResponse} = policyDetailsSlice.actions;

export default policyDetailsSlice.reducer;
