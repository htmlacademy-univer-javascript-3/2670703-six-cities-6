import { createReducer, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../mocks/offers';
import { SortingType } from '../const';
import { changeCity, changeSortingType, loadOffers, setHoveredOfferId } from './action';

export type OffersState = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  hoveredOfferId: number | null;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  sortingType: SortingType.Popular,
  hoveredOfferId: null,
};

export const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    })
    .addCase(changeSortingType, (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
    })
    .addCase(setHoveredOfferId, (state, action: PayloadAction<number | null>) => {
      state.hoveredOfferId = action.payload;
    });
});
