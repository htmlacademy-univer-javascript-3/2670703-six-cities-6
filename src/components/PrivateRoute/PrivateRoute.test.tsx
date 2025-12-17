import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './PrivateRoute';
import { offersReducer } from '../../store/offers/offers-reducer';
import { userReducer } from '../../store/user/user-reducer';
import { commentsReducer } from '../../store/comments/comments-reducer';
import type { State } from '../../store';
import { AuthorizationStatus } from '../../const';

const createMockStore = (preloadedState: Partial<State>) =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      comments: commentsReducer
    },
    preloadedState: preloadedState as State
  });

describe('PrivateRoute component', () => {
  it('should render spinner when authorization status is unknown', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private content</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading offers, please wait...')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });

  it('should render children when user is authorized', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          id: 1,
          name: 'User',
          email: 'user@example.com',
          avatarUrl: 'img/avatar.jpg',
          isPro: false,
          token: 'token'
        }
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private content</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });
});


