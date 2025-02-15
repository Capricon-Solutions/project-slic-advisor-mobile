import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  SalesMeterResponse: {
    data: {
      monthlySalePercentage: '38',
      monthlySale: 11359419,
      lastYearAchievement: 46614790,
      currentYearAchivement: 26,
      lastYearTarget: 46614790,
      currentYearGrowth: '76',
      lastYear: '2024',
      currentYear: '2025',
      tableData: [
        {
          type: 'Gen. Collec. - Cash',
          premium: '182,205.78',
          income: '15,368.00',
        },
        {
          type: 'Gen. Collec. - Cash',
          premium: '182,205.78',
          income: '15,368.00',
        },
        {
          type: 'Gen. Collec. - Cash',
          premium: '182,205.78',
          income: '15,368.00',
        },
      ],
    },
  },
};

export const SalesMeterSlice = createSlice({
  name: 'SalesMeterSlice',
  initialState,
  reducers: {
    GetsalesMeterResponse: (state, action) => {
      state.SalesMeterResponse = action.payload;
    },
  },
});

export const {GetsalesMeterResponse} = SalesMeterSlice.actions;

export default SalesMeterSlice.reducer;
