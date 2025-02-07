import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {api} from './api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Register the API reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware), // Add RTK Query middleware
});

// Enables automatic refetching of queries based on focus, reconnect, etc.
setupListeners(store.dispatch);
