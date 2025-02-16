// store.js
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from '../services/api'; // Import the base API
import profileReducer from './ProfileSlice'; // Import the reducer from the slice
import notificationsReducer from './NotificationSlice'; // Import the reducer from the slice
import SalesMeterReducer from './SalesMeterSlice';
import clubInfoReducer from './clubInfoSlice';
import individualStatReducer from './individualStatSlice';
import trainingListReducer from './trainingListSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    Profile: profileReducer,
    Notifications: notificationsReducer,
    SalesMeter: SalesMeterReducer,
    clubInfo: clubInfoReducer,
    individualStat: individualStatReducer,
    trainingList: trainingListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Enables automatic refetching of queries based on focus, reconnect, etc.
setupListeners(store.dispatch);
