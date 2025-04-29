import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agentCode: 905717,
  defaultImageUrl: null,
  profile: null,
  token: null,
  userCode: null,
  profileResponse: {
    data: {
      name: 'John Snow',
      designation: 'Advisor',
      status: 'Active',
      userType: 1,
      regionName: 'Central',
      agentCode: '12743',
      personalCode: '38649',
      nic: '940374825V',
      email: 'test@gmail.com',
      phone: '0712538452',
      contact: '0413724395',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s',
      Summery: {
        islandRank: 550,
        totalIslandRank: 995,
        regionalRank: 30,
        totalNumberofRegions: 60,
        branchRank: 2,
        totalNumberofBranches: 10,
      },
    },
  },
};

export const ProfileSlice = createSlice({
  name: 'ProfileSlice',
  initialState,
  reducers: {
    GetprofileResponse: (state, action) => {
      state.profileResponse = action.payload;
    },
    GetAgentCode: (state, action) => {
      state.agentCode = action.payload;
    },
    SetUserCode: (state, action) => {
      state.userCode = action.payload;
    },
    SetdefaultImageUrl: (state, action) => {
      state.defaultImageUrl = action.payload;
    },
    Setprofile: (state, action) => {
      state.profile = action.payload;
    },
    Settoken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { GetprofileResponse, SetdefaultImageUrl, GetAgentCode, Setprofile, Settoken, SetUserCode } =
  ProfileSlice.actions;

export default ProfileSlice.reducer;
