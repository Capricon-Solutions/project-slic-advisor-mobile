import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  trainingListResponse: {
    data: {
      tableData: [
        {
          trainingNo: '01',
          topic: 'Social Media Marketing',
          general: 'General',
          date: '21/12/2024 03:45pm',
          status: 'Completed',
        },
        {
          trainingNo: '02',
          topic: 'Content Writing',
          general: 'General',
          date: '21/12/2024 03:45pm',
          status: 'Completed',
        },
        {
          trainingNo: '03',
          topic: 'SEO Optimization',
          general: 'General',
          date: '21/12/2024 03:45pm',
          status: 'Completed',
        },
        {
          trainingNo: '04',
          topic: 'Email Marketing',
          general: 'General',
          date: '21/12/2024 03:45pm',
          status: 'Completed',
        },
        {
          trainingNo: '05',
          topic: 'Affiliate Marketing',
          general: 'General',
          date: '21/12/2024 03:45pm',
          status: 'Completed',
        },
      ],
    },
  },
};

export const trainingListSlice = createSlice({
  name: 'trainingListSlice',
  initialState,
  reducers: {
    GettrainingListResponse: (state, action) => {
      state.trainingListResponse = action.payload;
    },
  },
});

export const {GettrainingListResponse} = trainingListSlice.actions;

export default trainingListSlice.reducer;
