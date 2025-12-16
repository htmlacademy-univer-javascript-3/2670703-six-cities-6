import { createReducer, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import type { AuthInfo } from '../types/auth';
import { SortingType, AuthorizationStatus } from '../const';
import { changeCity, changeSortingType, fetchOffersAction, loadOffers, setHoveredOfferId, requireAuthorization, setUserData, checkAuthAction, loginAction, setCurrentOffer, setNearbyOffers, setComments, addComment, fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, submitCommentAction } from './action';
import type { Review } from '../components/ReviewItem/ReviewItem';

export type OffersState = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  hoveredOfferId: string | null;
  isOffersLoading: boolean;
  hasOffersLoadingError: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: AuthInfo | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isCurrentOfferLoading: boolean;
  hasCurrentOfferError: boolean;
  isCommentsLoading: boolean;
  isCommentSubmitting: boolean;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  sortingType: SortingType.Popular,
  hoveredOfferId: null,
  isOffersLoading: true,
  hasOffersLoadingError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isCurrentOfferLoading: false,
  hasCurrentOfferError: false,
  isCommentsLoading: false,
  isCommentSubmitting: false,
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
    .addCase(requireAuthorization, (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action: PayloadAction<AuthInfo | null>) => {
      state.userData = action.payload;
    })
    .addCase(setCurrentOffer, (state, action: PayloadAction<Offer | null>) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action: PayloadAction<Review>) => {
      state.comments.push(action.payload);
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
    .addMatcher(isAnyOf(checkAuthAction.rejected), (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addMatcher(isAnyOf(loginAction.rejected), (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
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
    .addMatcher(isAnyOf(fetchCommentsAction.pending), (state) => {
      state.isCommentsLoading = true;
    })
    .addMatcher(isAnyOf(fetchCommentsAction.fulfilled), (state, action: PayloadAction<Review[]>) => {
      state.isCommentsLoading = false;
      state.comments = action.payload;
    })
    .addMatcher(isAnyOf(fetchCommentsAction.rejected), (state) => {
      state.isCommentsLoading = false;
    })
    .addMatcher(isAnyOf(submitCommentAction.pending), (state) => {
      state.isCommentSubmitting = true;
    })
    .addMatcher(isAnyOf(submitCommentAction.fulfilled), (state, action: PayloadAction<Review>) => {
      state.isCommentSubmitting = false;
      state.comments.push(action.payload);
    })
    .addMatcher(isAnyOf(submitCommentAction.rejected), (state) => {
      state.isCommentSubmitting = false;
    });
});
