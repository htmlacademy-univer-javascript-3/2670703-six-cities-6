import { configureStore } from '@reduxjs/toolkit';
import { type ThunkDispatch } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import { offersData } from './reducer';
import { createApi } from '../services/api';
import { requireAuthorization } from './action';
import { AuthorizationStatus } from '../const';

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

api.interceptors.response.use(
  (response) => response,
  (error: { response?: { status?: number } }) => {
    if (error.response?.status === 401) {
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
    return Promise.reject(error);
  }
);

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<State, AxiosInstance, { type: string }>;
