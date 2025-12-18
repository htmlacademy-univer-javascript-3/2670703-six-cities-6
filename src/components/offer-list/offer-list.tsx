import { memo } from 'react';
import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  block?: 'cities' | 'favorites' | 'near-places';
  onOfferHover?: (offerId: string | null) => void;
  className?: string;
};

function OfferList({ offers, block = 'cities', onOfferHover, className }: OfferListProps) {
  const defaultContainerClassNames: Record<NonNullable<OfferListProps['block']>, string> = {
    cities: 'cities__places-list places__list tabs__content',
    favorites: 'favorites__places',
    'near-places': 'near-places__list places__list',
  };
  const containerClassName = className ?? defaultContainerClassNames[block];

  const handleMouseEnter = (offerId: string) => {
    if (onOfferHover) {
      onOfferHover(offerId);
    }
  };

  const handleMouseLeave = () => {
    if (onOfferHover) {
      onOfferHover(null);
    }
  };

  return (
    <div className={containerClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          block={block}
          onMouseEnter={onOfferHover ? handleMouseEnter : undefined}
          onMouseLeave={onOfferHover ? handleMouseLeave : undefined}
        />
      ))}
    </div>
  );
}

const MemoizedOfferList = memo(OfferList);

export default MemoizedOfferList;
