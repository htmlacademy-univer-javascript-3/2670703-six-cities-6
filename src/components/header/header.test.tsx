import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';
import { AuthorizationStatus } from '../../const';
import { createMockUserData } from '../../test-utils/mocks';

describe('Header component', () => {
  it('should render sign in link when user is not authorized', () => {
    render(
      <MemoryRouter>
        <Header
          authorizationStatus={AuthorizationStatus.NoAuth}
          userData={null}
          favoriteCount={0}
          onLogoutClick={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user info and favorite count when user is authorized', () => {
    const userData = createMockUserData();

    render(
      <MemoryRouter>
        <Header
          authorizationStatus={AuthorizationStatus.Auth}
          userData={userData}
          favoriteCount={3}
          onLogoutClick={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(userData.email)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
