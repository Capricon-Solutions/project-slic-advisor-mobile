import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  teamStatResponse: {
    data: {
      tableData: [
        {
          first: '905717 E.W.M.V.Jeewantha Boyagoda',
          New: {
            cash: '1014.96',
            debit: '181387.5',
          },
          Renewals: {
            cash: '3653.7',
            debit: '951349.69',
          },
          Total: {
            cash: '3668.66',
            debit: '1132737.19',
          },
        },
        {
          first: 'Premium No. of Policies',
          New: {
            cash: '1014.96',
            debit: '181387.5',
          },
          Renewals: {
            cash: '363353.7',
            debit: '951349.69',
          },
          Total: {
            cash: '3668.66',
            debit: '1132737.19',
          },
        },
        {
          first: '905717 E.W.M.V.Jeewantha Boyagoda',
          New: {
            cash: '1014.96',
            debit: '181387.5',
          },
          Renewals: {
            cash: '363353.7',
            debit: '951349.69',
          },
          Total: {
            cash: '3668.66',
            debit: '1132737.19',
          },
        },
        {
          first: '905717 E.W.M.V.Jeewantha Boyagoda',
          New: {
            cash: '1014.96',
            debit: '181387.5',
          },
          Renewals: {
            cash: '363353.7',
            debit: '951349.69',
          },
          Total: {
            cash: '3668.66',
            debit: '1132737.19',
          },
        },
        {
          first: '905717 E.W.M.V.Jeewantha Boyagoda',
          New: {
            cash: '1014.96',
            debit: '181387.5',
          },
          Renewals: {
            cash: '363353.7',
            debit: '951349.69',
          },
          Total: {
            cash: '3668.66',
            debit: '1132737.19',
          },
        },
      ],
    },
  },
  teamMemberResponse: {
    data: {
      tableData: [
        {
          first: 'Agent  01',
          Renewal: '3653.7',
          NB: '500,000',
          Refund: {
            ppw: '3668.66',
            other: '12737.19',
          },
          Endorsement: '500,000',
          Total: '500,000',
        },
        {
          first: 'Agent  02',
          Renewal: '3653.7',
          NB: '500,000',
          Refund: {
            ppw: '3668.66',
            other: '12737.19',
          },
          Endorsement: '500,000',
          Total: '500,000',
        },
      ],
    },
  },
};

export const teamStatSlice = createSlice({
  name: 'teamStatSlice',
  initialState,
  reducers: {
    GetteamStatResponse: (state, action) => {
      state.teamStatResponse = action.payload;
    },
    GetteamMemberResponse: (state, action) => {
      state.teamMemberResponse = action.payload;
    },
  },
});

export const {GetteamStatResponse, GetteamMemberResponse} =
  teamStatSlice.actions;

export default teamStatSlice.reducer;
