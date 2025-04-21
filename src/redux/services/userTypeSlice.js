import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: 1,
  agentCode: 0

};

export const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    GetuserType: (state, action) => {
      state.userType = action.payload;
    },
    SetagentCode: (state, action) => {
      state.agentCode = action.payload;
    },
  },
});

export const { GetuserType, SetagentCode } = userTypeSlice.actions;

export default userTypeSlice.reducer;
