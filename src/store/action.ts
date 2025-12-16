import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import { SortingType } from '../const';
import type { State } from './index';

export const changeCity = createAction<string>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const changeSortingType = createAction<SortingType>('offers/changeSortingType');

export const setHoveredOfferId = createAction<string | null>('offers/setHoveredOfferId');

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
