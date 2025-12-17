import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OfferList from './OfferList';
import type { Offer } from '../../types/offer';
import { createMockOffer } from '../../test-utils/mocks';

vi.mock('../OfferCard/OfferCard', () => ({
  __esModule: true,
  default: ({ offer, onMouseEnter, onMouseLeave }: { offer: Offer; onMouseEnter?: (offerId: string) => void; onMouseLeave?: () => void }) => (
    <div
      data-testid={`offer-card-${offer.id}`}
      onMouseEnter={() => onMouseEnter?.(offer.id)}
      onMouseLeave={onMouseLeave}
    >
      {offer.title}
    </div>
  )
}));

describe('OfferList component', () => {
  it('should render offers', () => {
    const offers: Offer[] = [
      createMockOffer({ id: '1', title: 'First offer' }),
      createMockOffer({ id: '2', title: 'Second offer' })
    ];

    render(<OfferList offers={offers} />);

    expect(screen.getByText('First offer')).toBeInTheDocument();
    expect(screen.getByText('Second offer')).toBeInTheDocument();
  });

  it('should call onOfferHover with offer id on mouse enter and with null on mouse leave', async () => {
    const user = userEvent.setup();
    const offers: Offer[] = [createMockOffer({ id: '1', title: 'First offer' })];
    const handleOfferHover = vi.fn();

    render(<OfferList offers={offers} onOfferHover={handleOfferHover} />);

    const card = screen.getByTestId('offer-card-1');

    await user.hover(card);
    expect(handleOfferHover).toHaveBeenCalledWith('1');

    await user.unhover(card);
    expect(handleOfferHover).toHaveBeenLastCalledWith(null);
  });
});


