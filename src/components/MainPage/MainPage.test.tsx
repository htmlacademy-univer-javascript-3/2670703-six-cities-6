import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MainPage from './MainPage';
import { AuthorizationStatus, SortingType } from '../../const';

type TestState = {
  offers: {
    city: string;
    offers: unknown[];
    sortingType: SortingType;
    hoveredOfferId: string | null;
    isOffersLoading: boolean;
    hasOffersLoadingError: boolean;
  };
  user: {
    authorizationStatus: AuthorizationStatus;
    userData: unknown;
    favoriteOffersCount: number;
  };
  comments: unknown;
};

const createMockStore = (stateOverrides?: Partial<TestState>) => {
  const initialState: TestState = {
    offers: {
      city: 'Paris',
      offers: [],
      sortingType: SortingType.Popular,
      hoveredOfferId: null,
      isOffersLoading: false,
      hasOffersLoadingError: false
    },
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      favoriteOffersCount: 0
    },
    comments: {}
  };

  return configureStore({
    reducer: (state: TestState = { ...initialState, ...stateOverrides }) => state
  });
};

vi.mock('../../store/action', () => ({
  changeCity: vi.fn(() => ({ type: 'offers/changeCity' })),
  changeSortingType: vi.fn(() => ({ type: 'offers/changeSortingType' })),
  fetchOffersAction: vi.fn(() => ({ type: 'offers/fetchOffers' })),
  setHoveredOfferId: vi.fn(() => ({ type: 'offers/setHoveredOfferId' })),
  logoutAction: vi.fn(() => ({ type: 'user/logout' }))
}));

describe('MainPage component', () => {
  it('should render loading spinner when offers are loading', () => {
    const store = createMockStore({
      offers: {
        city: 'Paris',
        offers: [],
        sortingType: SortingType.Popular,
        hoveredOfferId: null,
        isOffersLoading: true,
        hasOffersLoadingError: false
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading offers, please wait...')).toBeInTheDocument();
  });

  it('should render error message when hasOffersLoadingError is true', () => {
    const store = createMockStore({
      offers: {
        city: 'Paris',
        offers: [],
        sortingType: SortingType.Popular,
        hoveredOfferId: null,
        isOffersLoading: false,
        hasOffersLoadingError: true
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Server is not available')).toBeInTheDocument();
  });
});
