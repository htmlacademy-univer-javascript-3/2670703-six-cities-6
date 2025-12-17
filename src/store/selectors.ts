import { createSelector } from '@reduxjs/toolkit';
import type { State } from './index';
import { AuthorizationStatus, SortingType } from '../const';
import type { Offer } from '../types/offer';

export const getCity = (state: State): string => state.offers.city;

export const getOffers = (state: State): Offer[] => state.offers.offers;

export const getSortingType = (state: State): SortingType => state.offers.sortingType;

export const getHoveredOfferId = (state: State): string | null => state.offers.hoveredOfferId;

export const getIsOffersLoading = (state: State): boolean => state.offers.isOffersLoading;

export const getHasOffersLoadingError = (state: State): boolean => state.offers.hasOffersLoadingError;

export const getCurrentOffer = (state: State): Offer | null => state.offers.currentOffer;

export const getNearbyOffers = (state: State): Offer[] => state.offers.nearbyOffers;

export const getIsCurrentOfferLoading = (state: State): boolean => state.offers.isCurrentOfferLoading;

export const getHasCurrentOfferError = (state: State): boolean => state.offers.hasCurrentOfferError;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.user.authorizationStatus;

export const getUserData = (state: State) => state.user.userData;

export const getComments = (state: State) => state.comments.comments;

export const getIsCommentsLoading = (state: State): boolean => state.comments.isCommentsLoading;

export const getIsCommentSubmitting = (state: State): boolean => state.comments.isCommentSubmitting;

export const getOffersByCity = createSelector(
  [getOffers, getCity],
  (offers, activeCityName) => offers.filter((offer) => offer.city.name === activeCityName)
);

export const getSortedOffers = createSelector(
  [getOffersByCity, getSortingType],
  (cityOffers, sortingType) => {
    const sortedOffers = [...cityOffers];

    switch (sortingType) {
      case SortingType.PriceLowToHigh:
        return sortedOffers.sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
      case SortingType.PriceHighToLow:
        return sortedOffers.sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
      case SortingType.TopRatedFirst:
        return sortedOffers.sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
      case SortingType.Popular:
      default:
        return sortedOffers;
    }
  }
);

export const getFavoriteOffers = createSelector(
  [getOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const getFavoriteOffersCount = createSelector(
  [getFavoriteOffers],
  (favoriteOffers) => favoriteOffers.length
);

export const getOffersByCityGrouped = createSelector(
  [getFavoriteOffers],
  (favoriteOffers) => {
    const offersByCity: Record<string, Offer[]> = {};
    favoriteOffers.forEach((offer) => {
      (offersByCity[offer.city.name] ??= []).push(offer);
    });
    return offersByCity;
  }
);
