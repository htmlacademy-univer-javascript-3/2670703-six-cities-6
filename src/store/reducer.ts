import { createReducer, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import { SortingType } from '../const';
import { changeCity, changeSortingType, fetchOffersAction, loadOffers, setHoveredOfferId } from './action';

export type OffersState = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  hoveredOfferId: string | null;
  isOffersLoading: boolean;
  hasOffersLoadingError: boolean;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  sortingType: SortingType.Popular,
  hoveredOfferId: null,
  isOffersLoading: true,
  hasOffersLoadingError: false,
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
    .addCase(setHoveredOfferId, (state, action: PayloadAction<string | null>) => {
      state.hoveredOfferId = action.payload;
    })
    .addMatcher(isAnyOf(fetchOffersAction.pending), (state) => {
      state.isOffersLoading = true;
      state.hasOffersLoadingError = false;
    })
    .addMatcher(isAnyOf(fetchOffersAction.fulfilled), (state, action: PayloadAction<Offer[]>) => {
      state.isOffersLoading = false;
      state.offers = action.payload;
    })
    .addMatcher(isAnyOf(fetchOffersAction.rejected), (state) => {
      state.isOffersLoading = false;
      state.hasOffersLoadingError = true;
    });
});
