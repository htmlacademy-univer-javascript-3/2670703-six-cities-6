import { configureStore } from '@reduxjs/toolkit';
import { type ThunkDispatch } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import { offersData } from './reducer';
import { createApi } from '../services/api';

const api = createApi();

export const store = configureStore({
  reducer: offersData,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<State, AxiosInstance, { type: string }>;
