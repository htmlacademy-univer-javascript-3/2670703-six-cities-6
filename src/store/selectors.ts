import type { State } from './index';
import { AuthorizationStatus } from '../const';

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

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;

export const getUserData = (state: State) => state.userData;

export const getCurrentOffer = (state: State) => state.currentOffer;

export const getNearbyOffers = (state: State) => state.nearbyOffers;

export const getComments = (state: State) => state.comments;

export const getIsCurrentOfferLoading = (state: State) => state.isCurrentOfferLoading;

export const getHasCurrentOfferError = (state: State) => state.hasCurrentOfferError;

export const getIsCommentsLoading = (state: State) => state.isCommentsLoading;

export const getIsCommentSubmitting = (state: State) => state.isCommentSubmitting;
