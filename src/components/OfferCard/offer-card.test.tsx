import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OfferCard from './offer-card';
import { createMockOffer, createMockUserData } from '../../test-utils/mocks';
import { AuthorizationStatus } from '../../const';
import { toggleFavoriteStatusAction } from '../../store/action';

vi.mock('../../store/action', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../store/action')>();

  return {
    ...actual,
    toggleFavoriteStatusAction: vi.fn(() => () => Promise.resolve())
  };
});

type TestState = {
  user: {
    authorizationStatus: AuthorizationStatus;
    userData: unknown;
  };
};

const createMockStore = (preloadedState: TestState) =>
  configureStore({
    reducer: (state: TestState = preloadedState) => state
  });

describe('OfferCard component', () => {
  it('should navigate to login when user is not authorized and bookmark button is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={createMockOffer()} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    await user.click(bookmarkButton);

    expect(toggleFavoriteStatusAction).not.toHaveBeenCalled();
  });

  it('should dispatch toggleFavoriteStatusAction when user is authorized and bookmark button is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: createMockUserData()
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={createMockOffer()} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    await user.click(bookmarkButton);

    expect(toggleFavoriteStatusAction).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseEnter with offer id when hovered', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null
      }
    });
    const handleMouseEnter = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard
            offer={createMockOffer()}
            onMouseEnter={handleMouseEnter}
          />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Test offer').closest('article') as HTMLElement;

    await user.hover(card);

    expect(handleMouseEnter).toHaveBeenCalledWith('1');
  });
});
