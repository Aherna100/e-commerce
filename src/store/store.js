import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { apiStore } from '../api/apiSlice';
import userSlice from '../userSlice/userSlice';

export const store = configureStore({
    reducer: {
        [apiStore.reducerPath]: apiStore.reducer,
        auth: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiStore.middleware)
});

setupListeners(store.dispatch);