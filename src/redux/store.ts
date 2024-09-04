// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice';

export const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

// Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
