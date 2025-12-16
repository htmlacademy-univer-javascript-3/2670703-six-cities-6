import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import type { AuthInfo } from '../types/auth';
import { SortingType, AuthorizationStatus } from '../const';
import type { State } from './index';

export const changeCity = createAction<string>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const changeSortingType = createAction<SortingType>('offers/changeSortingType');

export const setHoveredOfferId = createAction<string | null>('offers/setHoveredOfferId');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<AuthInfo | null>('user/setUserData');

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthInfo, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<AuthInfo>('/login');
    localStorage.setItem('six-cities-token', data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    return data;
  }
);

export type LoginCredentials = {
  email: string;
  password: string;
};

export const loginAction = createAsyncThunk<AuthInfo, LoginCredentials, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    localStorage.setItem('six-cities-token', data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  (_arg, { dispatch }) => {
    localStorage.removeItem('six-cities-token');
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  }
);
