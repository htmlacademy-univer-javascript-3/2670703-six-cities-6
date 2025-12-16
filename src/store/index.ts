import { configureStore } from '@reduxjs/toolkit';
import { offersData } from './reducer';

export const store = configureStore({
  reducer: offersData,
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
