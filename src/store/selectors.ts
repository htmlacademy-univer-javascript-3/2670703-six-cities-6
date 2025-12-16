import type { State } from './index';

export const getCity = (state: State): string => state.city;

export const getOffers = (state: State) => state.offers;

export const getOffersByCity = (state: State) => {
  const activeCityName = getCity(state);

  return state.offers.filter((offer) => offer.city.name === activeCityName);
};

export const getSortingType = (state: State) => state.sortingType;

export const getHoveredOfferId = (state: State) => state.hoveredOfferId;

export const getIsOffersLoading = (state: State) => state.isOffersLoading;

export const getHasOffersLoadingError = (state: State) => state.hasOffersLoadingError;
