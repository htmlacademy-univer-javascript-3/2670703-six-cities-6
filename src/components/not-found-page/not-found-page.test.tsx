import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NotFoundPage from './not-found-page';
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

describe('NotFoundPage component', () => {
  it('should render 404 message and link', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    } as Partial<State>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('These aren\'t the droids you are looking for.')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
