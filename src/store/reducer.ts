import { createReducer, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../mocks/offers';
import { changeCity, loadOffers } from './action';

export type OffersState = {
  city: string;
  offers: Offer[];
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
};

export const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    });
});
