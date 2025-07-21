// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// export const baseApi = createApi({
//   reducerPath: 'api',

//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://gisalesappapi.slicgeneral.com/api/', // API base URL
//     prepareHeaders: (headers, {getState}) => {
//       // const token = getState()?.auth?.token;
//       const token = getState()?.Profile?.token;
//       console.log('token', token);
//       const apiKey = '12345abcde67890fghijklmnoprstuvwxz'; // Your API key

//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }

//       headers.set('x-api-key', apiKey); // Add API key in headers

//       return headers;
//     },
//   }),
//   tagTypes: ['Events', 'Trainings'],
//   endpoints: () => ({}), // Empty endpoints, will be extended
// });

////////////////////////////////////////////////////////

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../navigation/RootNavigation'; // adjust path as needed
import {showToast} from '../../components/ToastMessage';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://gisalesappapi.slicgeneral.com/api/',
  prepareHeaders: async (headers, {getState}) => {
    const state = getState();
    const token = state?.Profile?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('x-api-key', '12345abcde67890fghijklmnoprstuvwxz');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === 401 ||
    result?.error?.status === 403 ||
    result?.data?.status === 401 ||
    result?.data?.status === 403
  ) {
    console.warn('Unauthorized. Redirecting to login.');
    showToast({
      type: 'error',
      text1: 'Session expired',
      text2: 'You have been logged out. Please login again.',
    });
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('userInfo');

    navigate('Login');

    return {
      error: {
        status: 401,
        data: 'Unauthorized',
      },
    };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Events',
    'Trainings',
    'SetTarget',
    'Notifications',
    'MonthlyPlan',
    'ProfilePic',
  ],
  endpoints: () => ({}),
});
