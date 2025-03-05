import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  motorData: [
    {
      id: '1',
      icon: 'warning-amber',
      name: 'Pending Summary',
      subItem: [
        {
          id: 1,
          type: 'count',
          name: 'Vehicle Count to be Renewed',
          value: 1091,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Total to be Paid',
          value: 61745,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Premium',
          value: 3745,
        },
      ],
    },
    {
      id: '2',
      icon: 'check-circle-outline',
      name: 'Renewed Summary',
      subItem: [
        {
          id: 1,
          type: 'count',
          name: 'Renewal Vehicle Count',
          value: 509,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Total',
          value: 1745,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Premium to be Paid',
          value: 37617,
        },
      ],
    },
    {
      id: '3',
      icon: 'attach-money',
      name: 'Renewal Summary',
      subItem: [
        {
          id: 1,
          type: 'count',
          name: 'Renewal Vehicle Count',
          value: 1091,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Total',
          value: 61745,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Premium',
          value: 3745,
        },
      ],
    },
  ],
  nonmotorData: [
    {
      id: '1',
      icon: 'warning-amber',
      name: 'Pending Summary',
      subItem: [
        {
          id: 1,
          type: 'count',
          name: 'Policy Count to be Renewed',
          value: 10951,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Total to be Paid',
          value: 461745,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Premium to be Paid',
          value: 543745,
        },
      ],
    },
    {
      id: '2',
      icon: 'check-circle-outline',
      name: 'Renewed Summary',
      subItem: [
        {
          id: 1,
          type: 'count',
          name: 'Renewal Policy Count',
          value: 5309,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Total',
          value: 17345,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Premium',
          value: 3745617,
        },
      ],
    },
    {
      id: '3',
      icon: 'attach-money',
      name: 'Renewal Summary',
      subItem: [
        {
          id: 1,
          type: 'count',
          name: 'Renewal Policy Count',
          value: 1091,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Total',
          value: 614745,
        },
        {
          id: 1,
          type: 'price',
          name: 'Renewal Premium',
          value: 37445,
        },
      ],
    },
  ],
};

export const DUESSlice = createSlice({
  name: 'DUES',
  initialState,
  reducers: {
    GetmotorData: (state, action) => {
      state.motorData = action.payload;
    },
    GetnonmotorData: (state, action) => {
      state.nonmotorData = action.payload;
    },
  },
});

export const {GetmotorData, GetnonmotorData} = DUESSlice.actions;

export default DUESSlice.reducer;
