import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from '../services/api'; // Import the base API

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Register the base API reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware), // Add RTK Query middleware
});

// Enables automatic refetching of queries based on focus, reconnect, etc.
setupListeners(store.dispatch);
