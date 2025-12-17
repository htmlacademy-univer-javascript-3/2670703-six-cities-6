import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { offersReducer } from '../../store/offers/offers-reducer';
import { userReducer } from '../../store/user/user-reducer';
import { commentsReducer } from '../../store/comments/comments-reducer';
import type { State } from '../../store';
import { AuthorizationStatus } from '../../const';
import { createMockUserData } from '../../test-utils/mocks';

const createMockStore = (preloadedState: Partial<State>) =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      comments: commentsReducer
    },
    preloadedState: preloadedState as State
  });

describe('App routing', () => {
  it('should render main page when user navigates to root', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render login page when user navigates to /login', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', {
        name: 'Sign in',
        level: 1
      })
    ).toBeInTheDocument();
  });

  it('should redirect to login page when user is not authorized and navigates to /favorites', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', {
        name: 'Sign in',
        level: 1
      })
    ).toBeInTheDocument();
  });

  it('should render favorites page when user is authorized and navigates to /favorites', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: createMockUserData()
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render not found page for unknown route', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
