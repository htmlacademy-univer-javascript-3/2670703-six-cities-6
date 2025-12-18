import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesEmptyPage from './favorites-empty-page';
import { offersReducer } from '../../store/offers/offers-reducer';
import { userReducer } from '../../store/user/user-reducer';
import { commentsReducer } from '../../store/comments/comments-reducer';
import type { State } from '../../store';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/action';
import { createMockUserData } from '../../test-utils/mocks';

vi.mock('../../store/action', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../store/action')>();

  return {
    ...actual,
    logoutAction: vi.fn(() => ({
      type: 'user/logout'
    }))
  };
});

const createMockStore = (preloadedState: Partial<State>) =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      comments: commentsReducer
    },
    preloadedState: preloadedState as State
  });

describe('FavoritesEmptyPage component', () => {
  it('should render sign in link when user is not authorized', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesEmptyPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user info and sign out when user is authorized', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: createMockUserData()
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesEmptyPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should dispatch logoutAction when sign out is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: createMockUserData()
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesEmptyPage />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByText('Sign out'));

    expect(logoutAction).toHaveBeenCalledTimes(1);
  });
});
