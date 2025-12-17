import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage component', () => {
  it('should render 404 message and link', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('These aren\'t the droids you are looking for.')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
