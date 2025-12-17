import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingOptions from './SortingOptions';
import { SortingType } from '../../const';

describe('SortingOptions component', () => {
  it('should toggle options visibility when caption is clicked', async () => {
    const user = userEvent.setup();

    render(
      <SortingOptions
        currentSortingType={SortingType.Popular}
        onSortingTypeChange={vi.fn()}
      />
    );

    const caption = screen.getByText(SortingType.Popular, {
      selector: '.places__sorting-type'
    });

    await user.click(caption);

    const optionsList = screen.getByRole('list');
    expect(optionsList.className).toContain('places__options--opened');

    await user.click(caption);

    expect(optionsList.className).not.toContain('places__options--opened');
  });

  it('should call onSortingTypeChange when option is clicked and close list', async () => {
    const user = userEvent.setup();
    const handleSortingTypeChange = vi.fn();

    render(
      <SortingOptions
        currentSortingType={SortingType.Popular}
        onSortingTypeChange={handleSortingTypeChange}
      />
    );

    await user.click(
      screen.getByText(SortingType.Popular, {
        selector: '.places__sorting-type'
      })
    );
    await user.click(screen.getByText(SortingType.PriceLowToHigh));

    expect(handleSortingTypeChange).toHaveBeenCalledTimes(1);
    expect(handleSortingTypeChange).toHaveBeenCalledWith(SortingType.PriceLowToHigh);

    const optionsList = screen.getByRole('list');
    expect(optionsList.className).not.toContain('places__options--opened');
  });
});


