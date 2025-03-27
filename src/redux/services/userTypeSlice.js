import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: 1,

};

export const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    GetuserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { GetuserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
