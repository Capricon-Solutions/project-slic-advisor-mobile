import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: 0
};

export const NavControllerSlice = createSlice({
  name: 'NavControllerSlice',
  initialState,
  reducers: {
    Getpath: (state, action) => {
      state.path = action.payload;
    },

  },
});

export const { Getpath } = NavControllerSlice.actions;

export default NavControllerSlice.reducer;
