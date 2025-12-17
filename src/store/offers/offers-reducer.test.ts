import { describe, it, expect } from 'vitest';
import { offersReducer, type OffersState } from './offers-reducer';
import {
  changeCity,
  changeSortingType,
  fetchOffersAction,
  fetchOfferByIdAction,
  fetchNearbyOffersAction,
  loadOffers,
  setCurrentOffer,
  setFavoriteOffers,
  setHoveredOfferId,
  setNearbyOffers,
  toggleFavoriteStatusAction,
  updateOfferFavoriteStatus,
  fetchFavoriteOffersAction
} from '../action';
import { SortingType } from '../../const';
import type { Offer } from '../../types/offer';
import { createMockOffer } from '../../test-utils/mocks';

const createInitialState = (overrides?: Partial<OffersState>): OffersState => ({
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
  ...overrides
});

describe('offersReducer', () => {
  it('should return initial state for unknown action', () => {
    const state = offersReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(createInitialState());
  });

  it('should change city with changeCity action', () => {
    const initialState = createInitialState({ city: 'Paris' });
    const state = offersReducer(initialState, changeCity('Amsterdam'));

    expect(state.city).toBe('Amsterdam');
  });

  it('should load offers with loadOffers action', () => {
    const offers: Offer[] = [createMockOffer({ id: '1' }), createMockOffer({ id: '2' })];
    const initialState = createInitialState();

    const state = offersReducer(initialState, loadOffers(offers));

    expect(state.offers).toEqual(offers);
  });

  it('should change sorting type with changeSortingType action', () => {
    const initialState = createInitialState({ sortingType: SortingType.Popular });
    const state = offersReducer(initialState, changeSortingType(SortingType.PriceLowToHigh));

    expect(state.sortingType).toBe(SortingType.PriceLowToHigh);
  });

  it('should set hovered offer id with setHoveredOfferId action', () => {
    const initialState = createInitialState();
    const state = offersReducer(initialState, setHoveredOfferId('3'));

    expect(state.hoveredOfferId).toBe('3');
  });

  it('should reset hovered offer id with setHoveredOfferId(null)', () => {
    const initialState = createInitialState({ hoveredOfferId: '3' });
    const state = offersReducer(initialState, setHoveredOfferId(null));

    expect(state.hoveredOfferId).toBeNull();
  });

  it('should set current offer with setCurrentOffer action', () => {
    const offer = createMockOffer({ id: '10' });
    const initialState = createInitialState();

    const state = offersReducer(initialState, setCurrentOffer(offer));

    expect(state.currentOffer).toEqual(offer);
  });

  it('should set nearby offers with setNearbyOffers action', () => {
    const nearbyOffers: Offer[] = [createMockOffer({ id: '1' }), createMockOffer({ id: '2' })];
    const initialState = createInitialState();

    const state = offersReducer(initialState, setNearbyOffers(nearbyOffers));

    expect(state.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should update offer favorite status across state with updateOfferFavoriteStatus action', () => {
    const initialOffer = createMockOffer({ id: '1', isFavorite: false });
    const updatedOffer = { ...initialOffer, isFavorite: true };

    const initialState = createInitialState({
      offers: [initialOffer],
      currentOffer: initialOffer,
      nearbyOffers: [initialOffer]
    });

    const state = offersReducer(initialState, updateOfferFavoriteStatus(updatedOffer));

    expect(state.offers[0].isFavorite).toBe(true);
    expect(state.currentOffer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
  });

  it('should apply favorite offers with setFavoriteOffers action', () => {
    const nonFavoriteOffer = createMockOffer({ id: '1', isFavorite: false });
    const favoriteOffer = createMockOffer({ id: '2', isFavorite: true });
    const updatedFavoriteOffer = createMockOffer({ id: '1', isFavorite: true });

    const initialState = createInitialState({
      offers: [nonFavoriteOffer],
      currentOffer: nonFavoriteOffer,
      nearbyOffers: [nonFavoriteOffer]
    });

    const state = offersReducer(initialState, setFavoriteOffers([favoriteOffer, updatedFavoriteOffer]));

    expect(state.offers).toHaveLength(2);
    expect(state.offers.find((offer) => offer.id === '1')?.isFavorite).toBe(true);
    expect(state.offers.find((offer) => offer.id === '2')?.isFavorite).toBe(true);
    expect(state.currentOffer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
  });

  it('should handle fetchOffersAction.pending', () => {
    const initialState = createInitialState({
      isOffersLoading: false,
      hasOffersLoadingError: true
    });

    const state = offersReducer(initialState, { type: fetchOffersAction.pending.type });

    expect(state.isOffersLoading).toBe(true);
    expect(state.hasOffersLoadingError).toBe(false);
  });

  it('should handle fetchOffersAction.fulfilled', () => {
    const offers: Offer[] = [createMockOffer({ id: '1' })];
    const initialState = createInitialState({
      isOffersLoading: true,
      offers: []
    });

    const state = offersReducer(initialState, {
      type: fetchOffersAction.fulfilled.type,
      payload: offers
    });

    expect(state.isOffersLoading).toBe(false);
    expect(state.offers).toEqual(offers);
  });

  it('should handle fetchOffersAction.rejected', () => {
    const initialState = createInitialState({
      isOffersLoading: true,
      hasOffersLoadingError: false
    });

    const state = offersReducer(initialState, { type: fetchOffersAction.rejected.type });

    expect(state.isOffersLoading).toBe(false);
    expect(state.hasOffersLoadingError).toBe(true);
  });

  it('should handle fetchOfferByIdAction.pending', () => {
    const initialState = createInitialState({
      isCurrentOfferLoading: false,
      hasCurrentOfferError: true
    });

    const state = offersReducer(initialState, { type: fetchOfferByIdAction.pending.type });

    expect(state.isCurrentOfferLoading).toBe(true);
    expect(state.hasCurrentOfferError).toBe(false);
  });

  it('should handle fetchOfferByIdAction.fulfilled', () => {
    const offer = createMockOffer({ id: '1' });
    const initialState = createInitialState({
      isCurrentOfferLoading: true,
      currentOffer: null
    });

    const state = offersReducer(initialState, {
      type: fetchOfferByIdAction.fulfilled.type,
      payload: offer
    });

    expect(state.isCurrentOfferLoading).toBe(false);
    expect(state.currentOffer).toEqual(offer);
  });

  it('should handle fetchOfferByIdAction.rejected', () => {
    const initialState = createInitialState({
      isCurrentOfferLoading: true,
      hasCurrentOfferError: false,
      currentOffer: createMockOffer({ id: '1' })
    });

    const state = offersReducer(initialState, { type: fetchOfferByIdAction.rejected.type });

    expect(state.isCurrentOfferLoading).toBe(false);
    expect(state.hasCurrentOfferError).toBe(true);
    expect(state.currentOffer).toBeNull();
  });

  it('should handle fetchNearbyOffersAction.fulfilled', () => {
    const nearbyOffers: Offer[] = [createMockOffer({ id: '2' })];
    const initialState = createInitialState({
      nearbyOffers: []
    });

    const state = offersReducer(initialState, {
      type: fetchNearbyOffersAction.fulfilled.type,
      payload: nearbyOffers
    });

    expect(state.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should handle toggleFavoriteStatusAction.fulfilled', () => {
    const initialOffer = createMockOffer({ id: '1', isFavorite: false });
    const updatedOffer = { ...initialOffer, isFavorite: true };

    const initialState = createInitialState({
      offers: [initialOffer],
      currentOffer: initialOffer,
      nearbyOffers: [initialOffer]
    });

    const state = offersReducer(initialState, {
      type: toggleFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer
    });

    expect(state.offers[0].isFavorite).toBe(true);
    expect(state.currentOffer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
  });

  it('should handle fetchFavoriteOffersAction.fulfilled', () => {
    const nonFavoriteOffer = createMockOffer({ id: '1', isFavorite: false });
    const favoriteOffer = createMockOffer({ id: '2', isFavorite: true });
    const updatedFavoriteOffer = createMockOffer({ id: '1', isFavorite: true });

    const initialState = createInitialState({
      offers: [nonFavoriteOffer],
      currentOffer: nonFavoriteOffer,
      nearbyOffers: [nonFavoriteOffer]
    });

    const state = offersReducer(initialState, {
      type: fetchFavoriteOffersAction.fulfilled.type,
      payload: [favoriteOffer, updatedFavoriteOffer]
    });

    expect(state.offers).toHaveLength(2);
    expect(state.offers.find((offer) => offer.id === '1')?.isFavorite).toBe(true);
    expect(state.offers.find((offer) => offer.id === '2')?.isFavorite).toBe(true);
    expect(state.currentOffer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
  });
});


