import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import OfferList from '../offer-list/offer-list';
import CommentForm from '../comment-form/comment-form';
import NotFoundPage from '../not-found-page/not-found-page';
import Map from '../map/map';
import ReviewList from '../review-list/review-list';
import Spinner from '../spinner/spinner';
import Header from '../header/header';
import { getAuthorizationStatus, getUserData, getCurrentOffer, getNearbyOffers, getComments, getIsCurrentOfferLoading, getHasCurrentOfferError, getIsCommentSubmitting, getFavoriteOffersCount } from '../../store/selectors';
import { logoutAction, fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, submitCommentAction, toggleFavoriteStatusAction } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import type { CommentSubmission } from '../../types/offer';

function OfferPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const currentOffer = useSelector(getCurrentOffer);
  const nearbyOffers = useSelector(getNearbyOffers);
  const comments = useSelector(getComments);
  const isCurrentOfferLoading = useSelector(getIsCurrentOfferLoading);
  const hasCurrentOfferError = useSelector(getHasCurrentOfferError);
  const isCommentSubmitting = useSelector(getIsCommentSubmitting);
  const favoritesCount = useSelector(getFavoriteOffersCount);

  const { id } = useParams();

  const handleLogoutClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const handleFavoriteClick = useCallback(() => {
    if (!id || !currentOffer) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteStatusAction({ offerId: id, isFavorite: !currentOffer.isFavorite }));
  }, [authorizationStatus, currentOffer, dispatch, id, navigate]);

  const handleCommentSubmit = useCallback((commentData: CommentSubmission) => {
    if (id) {
      dispatch(submitCommentAction({ offerId: id, comment: commentData }))
        .then(() => {
          dispatch(fetchCommentsAction(id));
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  const limitedNearbyOffers = useMemo(
    () => nearbyOffers.slice(0, 3),
    [nearbyOffers]
  );

  const nearbyOffersForMap = useMemo(() => {
    if (!currentOffer) {
      return limitedNearbyOffers;
    }
    return [currentOffer, ...limitedNearbyOffers];
  }, [currentOffer, limitedNearbyOffers]);

  const ratingWidth = useMemo(() => {
    if (!currentOffer) {
      return '0%';
    }
    const roundedRating = Math.round(currentOffer.rating);
    return `${roundedRating * 20}%`;
  }, [currentOffer]);

  const galleryImages = useMemo(() => {
    if (!currentOffer) {
      return [];
    }
    const imageCounters: Record<string, number> = {};
    return (currentOffer.images ?? []).map((image) => {
      const nextCount = (imageCounters[image] ?? 0) + 1;
      imageCounters[image] = nextCount;
      return {
        src: image,
        key: `${currentOffer.id}-${image}-${nextCount}`,
      };
    });
  }, [currentOffer]);

  if (isCurrentOfferLoading) {
    return <Spinner />;
  }

  if (hasCurrentOfferError || !currentOffer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
        favoriteCount={favoritesCount}
        onLogoutClick={handleLogoutClick}
      />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages.slice(0, 6).map((imageItem) => (
                <div className="offer__image-wrapper" key={imageItem.key}>
                  <img className="offer__image" src={imageItem.src} alt={currentOffer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingWidth}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type === 'apartment' && 'Apartment'}
                  {currentOffer.type === 'room' && 'Room'}
                  {currentOffer.type === 'house' && 'House'}
                  {currentOffer.type === 'hotel' && 'Hotel'}
                </li>
                {currentOffer.bedrooms !== undefined && (
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer.bedrooms} {currentOffer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </li>
                )}
                {currentOffer.maxAdults !== undefined && (
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} {currentOffer.maxAdults === 1 ? 'adult' : 'adults'}
                  </li>
                )}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {(currentOffer.goods ?? []).map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              {currentOffer.host && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {currentOffer.host.name}
                    </span>
                    {currentOffer.host.isPro && (
                      <span className="offer__user-status">
                        Pro
                      </span>
                    )}
                  </div>
                  {currentOffer.description && (
                    <div className="offer__description">
                      <p className="offer__text">
                        {currentOffer.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewList reviews={comments} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isCommentSubmitting} />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={currentOffer.city} offers={nearbyOffersForMap} activeOfferId={currentOffer.id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offers={limitedNearbyOffers} block="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
