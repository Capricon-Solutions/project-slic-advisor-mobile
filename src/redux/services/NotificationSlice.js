import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notificationsResponse: {
    data: [
      {
        id: 1,
        Title: 'Claim Intimated',
        name: 'Dr A N HEWAGE',
        date: '12/04/2024 5:53:04 PM',
        plicyNo: 'VMI119001710000672',
        type: 'COMPREHENSIVE',
        intimated_date: '12/04/2024 5:53:04 PM',
        phone: '0772616625',
      },
      {
        id: 2,
        Title: 'Claim Intimated',
        name: 'Dr A N HEWAGE',
        date: '12/04/2024 5:53:04 PM',
        plicyNo: 'VMI119001710000672',
        type: 'COMPREHENSIVE',
        intimated_date: '12/04/2024 5:53:04 PM',
        phone: '0772616625',
      },
      {
        id: 3,
        Title: 'Claim Intimated',
        name: 'Dr A N HEWAGE',
        date: '12/04/2024 5:53:04 PM',
        plicyNo: 'VMI119001710000672',
        type: 'COMPREHENSIVE',
        intimated_date: '12/04/2024 5:53:04 PM',
        phone: '0772616625',
      },
    ],
  },
};

export const NotificationSlice = createSlice({
  name: 'NotificationSlice',
  initialState,
  reducers: {
    GetnotificationsResponse: (state, action) => {
      state.notificationsResponse = action.payload;
    },
  },
});

export const {GetnotificationsResponse} = NotificationSlice.actions;

export default NotificationSlice.reducer;
