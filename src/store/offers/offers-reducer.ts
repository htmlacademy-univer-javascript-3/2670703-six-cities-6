import { createReducer, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer';
import { SortingType } from '../../const';
import { changeCity, changeSortingType, fetchOffersAction, loadOffers, setHoveredOfferId, setCurrentOffer, setNearbyOffers, fetchOfferByIdAction, fetchNearbyOffersAction, updateOfferFavoriteStatus, fetchFavoriteOffersAction, setFavoriteOffers, toggleFavoriteStatusAction } from '../action';

export type OffersState = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  hoveredOfferId: string | null;
  isOffersLoading: boolean;
  hasOffersLoadingError: boolean;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  isCurrentOfferLoading: boolean;
  hasCurrentOfferError: boolean;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  sortingType: SortingType.Popular,
  hoveredOfferId: null,
  isOffersLoading: true,
  hasOffersLoadingError: false,
  currentOffer: null,
  nearbyOffers: [],
  isCurrentOfferLoading: false,
  hasCurrentOfferError: false,
};

const applyUpdatedOffer = (state: OffersState, updatedOffer: Offer): void => {
  state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);

  if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
    state.currentOffer = updatedOffer;
  }

  state.nearbyOffers = state.nearbyOffers.map((offer) =>
    offer.id === updatedOffer.id ? updatedOffer : offer
  );
};

const applyFavoriteOffers = (state: OffersState, favoriteOffers: Offer[]): void => {
  const offersMap = new Map(state.offers.map((offer) => [offer.id, offer]));

  favoriteOffers.forEach((favoriteOffer) => {
    offersMap.set(favoriteOffer.id, favoriteOffer);
  });

  state.offers = Array.from(offersMap.values());

  if (state.currentOffer && offersMap.has(state.currentOffer.id)) {
    state.currentOffer = offersMap.get(state.currentOffer.id) ?? state.currentOffer;
  }

  state.nearbyOffers = state.nearbyOffers.map((offer) =>
    offersMap.has(offer.id) ? offersMap.get(offer.id) ?? offer : offer
  );
};

export const offersReducer = createReducer(initialState, (builder) => {
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
    .addCase(setCurrentOffer, (state, action: PayloadAction<Offer | null>) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(updateOfferFavoriteStatus, (state, action: PayloadAction<Offer>) => {
      applyUpdatedOffer(state, action.payload);
    })
    .addCase(setFavoriteOffers, (state, action: PayloadAction<Offer[]>) => {
      applyFavoriteOffers(state, action.payload);
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
    })
    .addMatcher(isAnyOf(fetchOfferByIdAction.pending), (state) => {
      state.isCurrentOfferLoading = true;
      state.hasCurrentOfferError = false;
    })
    .addMatcher(isAnyOf(fetchOfferByIdAction.fulfilled), (state, action: PayloadAction<Offer>) => {
      state.isCurrentOfferLoading = false;
      state.currentOffer = action.payload;
    })
    .addMatcher(isAnyOf(fetchOfferByIdAction.rejected), (state) => {
      state.isCurrentOfferLoading = false;
      state.hasCurrentOfferError = true;
      state.currentOffer = null;
    })
    .addMatcher(isAnyOf(fetchNearbyOffersAction.fulfilled), (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    })
    .addMatcher(isAnyOf(toggleFavoriteStatusAction.fulfilled), (state, action: PayloadAction<Offer>) => {
      applyUpdatedOffer(state, action.payload);
    })
    .addMatcher(isAnyOf(fetchFavoriteOffersAction.fulfilled), (state, action: PayloadAction<Offer[]>) => {
      applyFavoriteOffers(state, action.payload);
    });
});
