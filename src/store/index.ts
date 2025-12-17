import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { type ThunkDispatch } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import { offersReducer } from './offers/offers-reducer';
import { userReducer } from './user/user-reducer';
import { commentsReducer } from './comments/comments-reducer';
import { createApi } from '../services/api';
import { requireAuthorization } from './action';
import { AuthorizationStatus } from '../const';

const api = createApi();

const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

api.interceptors.response.use(
  (response) => response,
  (error: { response?: { status?: number }; config?: { url?: string } }) => {
    if (error.response?.status === 401) {
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      if (error.config?.url?.includes('/login')) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<State, AxiosInstance, { type: string }>;
