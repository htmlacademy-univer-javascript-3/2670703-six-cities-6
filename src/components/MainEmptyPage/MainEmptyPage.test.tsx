import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainEmptyPage from './MainEmptyPage';

describe('MainEmptyPage component', () => {
  it('should render empty state for active city', () => {
    const handleCityChange = vi.fn();

    render(
      <MainEmptyPage
        activeCity="Paris"
        cities={['Paris', 'Amsterdam']}
        onCityChange={handleCityChange}
      />
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Paris')).toBeInTheDocument();
  });
});


