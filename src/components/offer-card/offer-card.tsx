import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Offer } from '../../types/offer';
import type { AppDispatch } from '../../store';
import { getAuthorizationStatus } from '../../store/selectors';
import { toggleFavoriteStatusAction } from '../../store/action';
import { AuthorizationStatus } from '../../const';

type OfferCardProps = {
  offer: Offer;
  block?: 'cities' | 'favorites' | 'near-places';
  onMouseEnter?: (offerId: string) => void;
  onMouseLeave?: () => void;
};

function OfferCard({ offer, block = 'cities', onMouseEnter, onMouseLeave }: OfferCardProps) {
  const { id, title, price, type, previewImage, isPremium, isFavorite, rating } = offer;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const roundedRating = Math.round(rating);
  const ratingWidth = `${roundedRating * 20}%`;
  const blockCardClasses: Record<NonNullable<OfferCardProps['block']>, string> = {
    cities: 'cities__card',
    favorites: 'favorites__card',
    'near-places': 'near-places__card',
  };
  const blockImageWrapperClasses: Record<NonNullable<OfferCardProps['block']>, string> = {
    cities: 'cities__image-wrapper',
    favorites: 'favorites__image-wrapper',
    'near-places': 'near-places__image-wrapper',
  };
  const cardClassName = `${blockCardClasses[block]} place-card`;
  const imageWrapperClassName = `${blockImageWrapperClasses[block]} place-card__image-wrapper`;
  const infoClassName = block === 'favorites' ? 'favorites__card-info place-card__info' : 'place-card__info';
  const imageSize = block === 'favorites' ? { width: 150, height: 110 } : { width: 260, height: 200 };

  const handleBookmarkClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteStatusAction({ offerId: id, isFavorite: !isFavorite }));
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  return (
    <article
      className={cardClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassName}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageSize.width} height={imageSize.height} alt={title} />
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const MemoizedOfferCard = memo(OfferCard);

export default MemoizedOfferCard;
