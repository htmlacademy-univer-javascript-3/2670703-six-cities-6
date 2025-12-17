import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();

  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();

  return {
    ...actual,
    useDispatch: () => (action: unknown) => {
      void action;
      return {
        unwrap: () => Promise.resolve()
      };
    }
  };
});

const createMockStore = () =>
  configureStore({
    reducer: (state: Record<string, unknown> = {}) => state
  });

describe('LoginPage component', () => {
  it('should render login form', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', {
        name: 'Sign in',
        level: 1
      })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should not dispatch loginAction when password is empty', async () => {
    const user = userEvent.setup();
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await user.clear(screen.getByPlaceholderText('Password'));
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('should dispatch loginAction and navigate to main page on successful login', async () => {
    const user = userEvent.setup();
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await Promise.resolve();

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
