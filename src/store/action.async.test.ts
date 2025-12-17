import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import type { AxiosInstance } from 'axios';
import {
  checkAuthAction,
  fetchCommentsAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferByIdAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
  submitCommentAction,
  toggleFavoriteStatusAction
} from './action';
import type { State } from './index';
import type { Offer } from '../types/offer';
import type { AuthInfo } from '../types/auth';
import type { Review } from '../components/ReviewItem/ReviewItem';
import { AuthorizationStatus } from '../const';
import { requireAuthorization, setUserData } from './action';

type ThunkDispatch = (action: unknown) => void;

import { createMockOffer, createMockUserData } from '../test-utils/mocks';

const createMockReview = (overrides?: Partial<Review>): Review => ({
  id: 1,
  user: {
    name: 'User',
    avatarUrl: 'img/avatar.jpg',
    isPro: false
  },
  rating: 4,
  comment: 'Mock comment',
  date: '2020-01-01T00:00:00.000Z',
  ...overrides
});

const createMockAuthInfo = (overrides?: Partial<AuthInfo>): AuthInfo =>
  createMockUserData(overrides);

const createApiWithMockAdapter = (): { api: AxiosInstance; mockAdapter: MockAdapter } => {
  const api = axios.create();
  const mockAdapter = new MockAdapter(api);

  return { api, mockAdapter };
};

const createEmptyState = (): State => ({
  offers: {} as State['offers'],
  user: {} as State['user'],
  comments: {} as State['comments']
});

describe('async actions', () => {

  it('fetchOffersAction should dispatch pending and fulfilled with offers', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const offers: Offer[] = [createMockOffer({ id: '1' }), createMockOffer({ id: '2' })];
    mockAdapter.onGet('/offers').reply(200, offers);

    const thunk = fetchOffersAction();
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(fetchOffersAction.pending.type);
    expect(actions[1].type).toBe(fetchOffersAction.fulfilled.type);
    expect(actions[1].payload).toEqual(offers);
  });

  it('fetchOfferByIdAction should dispatch fulfilled with offer', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const offer = createMockOffer({ id: '10' });
    mockAdapter.onGet('/offers/10').reply(200, offer);

    const thunk = fetchOfferByIdAction('10');
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(fetchOfferByIdAction.pending.type);
    expect(actions[1].type).toBe(fetchOfferByIdAction.fulfilled.type);
    expect(actions[1].payload).toEqual(offer);
  });

  it('fetchNearbyOffersAction should dispatch fulfilled with nearby offers', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const offers: Offer[] = [createMockOffer({ id: '2' })];
    mockAdapter.onGet('/offers/1/nearby').reply(200, offers);

    const thunk = fetchNearbyOffersAction('1');
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(fetchNearbyOffersAction.pending.type);
    expect(actions[1].type).toBe(fetchNearbyOffersAction.fulfilled.type);
    expect(actions[1].payload).toEqual(offers);
  });

  it('fetchCommentsAction should dispatch fulfilled with comments', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const comments: Review[] = [createMockReview({ id: 1 })];
    mockAdapter.onGet('/comments/1').reply(200, comments);

    const thunk = fetchCommentsAction('1');
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(fetchCommentsAction.pending.type);
    expect(actions[1].type).toBe(fetchCommentsAction.fulfilled.type);
    expect(actions[1].payload).toEqual(comments);
  });

  it('submitCommentAction should dispatch fulfilled with created comment', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const createdComment = createMockReview({ id: 3 });
    mockAdapter.onPost('/comments/1').reply(200, createdComment);

    const thunk = submitCommentAction({
      offerId: '1',
      comment: {
        comment: 'Test comment',
        rating: 5
      }
    });

    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(submitCommentAction.pending.type);
    expect(actions[1].type).toBe(submitCommentAction.fulfilled.type);
    expect(actions[1].payload).toEqual(createdComment);
  });

  it('toggleFavoriteStatusAction should dispatch fulfilled with updated offer', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const updatedOffer = createMockOffer({ id: '1', isFavorite: true });
    mockAdapter.onPost('/favorite/1/1').reply(200, updatedOffer);

    const thunk = toggleFavoriteStatusAction({
      offerId: '1',
      isFavorite: true
    });

    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(toggleFavoriteStatusAction.pending.type);
    expect(actions[1].type).toBe(toggleFavoriteStatusAction.fulfilled.type);
    expect(actions[1].payload).toEqual(updatedOffer);
  });

  it('fetchFavoriteOffersAction should dispatch fulfilled with favorite offers', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const favoriteOffers: Offer[] = [createMockOffer({ id: '1', isFavorite: true })];
    mockAdapter.onGet('/favorite').reply(200, favoriteOffers);

    const thunk = fetchFavoriteOffersAction();
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    expect(actions[0].type).toBe(fetchFavoriteOffersAction.pending.type);
    expect(actions[1].type).toBe(fetchFavoriteOffersAction.fulfilled.type);
    expect(actions[1].payload).toEqual(favoriteOffers);
  });

  it('checkAuthAction should dispatch requireAuthorization(Auth) and setUserData on success', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const authInfo = createMockAuthInfo();
    mockAdapter.onGet('/login').reply(200, authInfo);

    const thunk = checkAuthAction();
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    const hasRequireAuthAction = actions.some(
      (action) => action.type === requireAuthorization.type && action.payload === AuthorizationStatus.Auth
    );
    const hasSetUserDataAction = actions.some(
      (action) => action.type === setUserData.type
    );

    expect(hasRequireAuthAction).toBe(true);
    expect(hasSetUserDataAction).toBe(true);
  });

  it('checkAuthAction should dispatch requireAuthorization(NoAuth) and reject value on 401', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    mockAdapter.onGet('/login').reply(401);

    const thunk = checkAuthAction();
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    const hasRequireAuthNoAuthAction = actions.some(
      (action) => action.type === requireAuthorization.type && action.payload === AuthorizationStatus.NoAuth
    );
    const rejectedAction = actions.find((action) => action.type === checkAuthAction.rejected.type);

    expect(hasRequireAuthNoAuthAction).toBe(true);
    expect(rejectedAction).toBeDefined();
  });

  it('loginAction should dispatch requireAuthorization(Auth) and setUserData on success', async () => {
    const { api, mockAdapter } = createApiWithMockAdapter();
    const dispatch: ThunkDispatch = vi.fn();
    const authInfo = createMockAuthInfo();
    mockAdapter.onPost('/login').reply(200, authInfo);

    const thunk = loginAction({
      email: 'user@example.com',
      password: 'password'
    });

    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    const hasRequireAuthAction = actions.some(
      (action) => action.type === requireAuthorization.type && action.payload === AuthorizationStatus.Auth
    );
    const hasSetUserDataAction = actions.some(
      (action) => action.type === setUserData.type
    );

    expect(hasRequireAuthAction).toBe(true);
    expect(hasSetUserDataAction).toBe(true);
  });

  it('logoutAction should dispatch requireAuthorization(NoAuth) and setUserData(null)', async () => {
    const api = axios.create();
    const dispatch: ThunkDispatch = vi.fn();

    const thunk = logoutAction();
    await thunk(dispatch, () => createEmptyState(), api);

    const actions = (dispatch as ReturnType<typeof vi.fn>).mock.calls.map((call) => call[0] as { type: string; payload?: unknown });

    const hasRequireAuthNoAuthAction = actions.some(
      (action) => action.type === requireAuthorization.type && action.payload === AuthorizationStatus.NoAuth
    );
    const hasResetUserDataAction = actions.some(
      (action) => action.type === setUserData.type && action.payload === null
    );

    expect(hasRequireAuthNoAuthAction).toBe(true);
    expect(hasResetUserDataAction).toBe(true);
  });
});


