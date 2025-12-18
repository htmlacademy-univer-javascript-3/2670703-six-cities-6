import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityList from './city-list';

describe('CityList component', () => {
  it('should render list of cities', () => {
    const cities = ['Paris', 'Cologne', 'Amsterdam'];

    render(
      <CityList
        cities={cities}
        activeCity="Paris"
        onCityChange={vi.fn()}
      />
    );

    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should call onCityChange when clicking on inactive city', async () => {
    const user = userEvent.setup();
    const cities = ['Paris', 'Cologne', 'Amsterdam'];
    const handleCityChange = vi.fn();

    render(
      <CityList
        cities={cities}
        activeCity="Paris"
        onCityChange={handleCityChange}
      />
    );

    await user.click(screen.getByText('Cologne'));

    expect(handleCityChange).toHaveBeenCalledTimes(1);
    expect(handleCityChange).toHaveBeenCalledWith('Cologne');
  });

  it('should not call onCityChange when clicking on active city', async () => {
    const user = userEvent.setup();
    const cities = ['Paris', 'Cologne', 'Amsterdam'];
    const handleCityChange = vi.fn();

    render(
      <CityList
        cities={cities}
        activeCity="Paris"
        onCityChange={handleCityChange}
      />
    );

    await user.click(screen.getByText('Paris'));

    expect(handleCityChange).not.toHaveBeenCalled();
  });
});
