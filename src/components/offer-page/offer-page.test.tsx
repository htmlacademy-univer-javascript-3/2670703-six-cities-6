import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OfferPage from './offer-page';
import { AuthorizationStatus } from '../../const';
import type { Offer } from '../../types/offer';
import { createMockCity, createMockOffer } from '../../test-utils/mocks';

type TestState = {
  offers: {
    city: string;
    offers: Offer[];
    currentOffer: Offer | null;
    nearbyOffers: Offer[];
  };
  user: {
    authorizationStatus: AuthorizationStatus;
    userData: unknown;
    favoriteOffersCount: number;
  };
  comments: {
    comments: unknown[];
    isCommentSubmitting: boolean;
  };
};

const createMockStore = (stateOverrides?: Partial<TestState>) => {
  const initialState: TestState = {
    offers: {
      city: createMockCity().name,
      offers: [],
      currentOffer: createMockOffer(),
      nearbyOffers: []
    },
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      favoriteOffersCount: 0
    },
    comments: {
      comments: [],
      isCommentSubmitting: false
    }
  };

  return configureStore({
    reducer: (state: TestState = { ...initialState, ...stateOverrides }) => state
  });
};

vi.mock('../../store/action', () => ({
  logoutAction: vi.fn(() => ({ type: 'user/logout' })),
  fetchOfferByIdAction: vi.fn(() => ({ type: 'offers/fetchById' })),
  fetchNearbyOffersAction: vi.fn(() => ({ type: 'offers/fetchNearby' })),
  fetchCommentsAction: vi.fn(() => ({ type: 'comments/fetch' })),
  submitCommentAction: vi.fn(() => ({ type: 'comments/submit' })),
  toggleFavoriteStatusAction: vi.fn(() => ({ type: 'offers/toggleFavoriteStatus' }))
}));

describe('OfferPage component', () => {
  it('should render not found page when there is an error', () => {
    const store = createMockStore({
      offers: {
        city: 'Paris',
        offers: [],
        currentOffer: null,
        nearbyOffers: []
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('should render offer details when currentOffer is present', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test offer')).toBeInTheDocument();
  });
});
