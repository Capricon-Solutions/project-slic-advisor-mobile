import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clubInfoResponse: {
    data: {
      currentClub: 'Millionaires Club',
      currentClublimit: '1,500,000.00',
      generalAppointmentDate: '2001/04/11',
      generalPersistency: '82.02%',
      last5YearAverage: '3,335,511.31',
      nextClub: 'Platinum Club',
      platinumClub: '3,750,000.00',
      lastUpdatedDate: '2024/10/31',
      annualIncomeUpTo: {
        date: '2024/10/31',
        amount: '3,750,000.00',
      },
      tableData: [
        { total: '2024', endorsement: '1,135,750' },
        { total: '2023', endorsement: '1,135,750' },
        { total: '2022', endorsement: '1,135,750' },
        { total: '2021', endorsement: '1,135,750' },
        { total: '2020', endorsement: '1,135,750' },
      ],
    },
  },
};

export const clubInfoSlice = createSlice({
  name: 'clubInfoSlice',
  initialState,
  reducers: {
    GetclubInfoResponse: (state, action) => {
      state.clubInfoResponse = action.payload;
    },
  },
});



export const { GetclubInfoResponse } = clubInfoSlice.actions;

export default clubInfoSlice.reducer;
