import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesPage from './favorites-page';
import { AuthorizationStatus } from '../../const';

type TestState = {
  offers: {
    offers: unknown[];
  };
  user: {
    authorizationStatus: AuthorizationStatus;
    userData: unknown;
  };
  comments: unknown;
};

const createMockStore = (stateOverrides?: Partial<TestState>) => {
  const initialState: TestState = {
    offers: {
      offers: []
    },
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    },
    comments: {}
  };

  return configureStore({
    reducer: (state: TestState = { ...initialState, ...stateOverrides }) => state
  });
};

vi.mock('../../store/action', () => ({
  logoutAction: vi.fn(() => ({ type: 'user/logout' })),
  fetchFavoriteOffersAction: vi.fn(() => ({ type: 'offers/fetchFavorites' }))
}));

describe('FavoritesPage component', () => {
  it('should render empty favorites page when there are no favorite offers', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
