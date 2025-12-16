import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import OfferList from '../OfferList/OfferList';
import CommentForm from '../CommentForm/CommentForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Map from '../Map/Map';
import ReviewList from '../ReviewList/ReviewList';
import Spinner from '../Spinner/Spinner';
import { getOffers, getAuthorizationStatus, getUserData, getCurrentOffer, getNearbyOffers, getComments, getIsCurrentOfferLoading, getHasCurrentOfferError, getIsCommentSubmitting } from '../../store/selectors';
import { logoutAction, fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, submitCommentAction } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import type { CommentSubmission } from '../../types/offer';

function OfferPage() {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector(getOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const currentOffer = useSelector(getCurrentOffer);
  const nearbyOffers = useSelector(getNearbyOffers);
  const comments = useSelector(getComments);
  const isCurrentOfferLoading = useSelector(getIsCurrentOfferLoading);
  const hasCurrentOfferError = useSelector(getHasCurrentOfferError);
  const isCommentSubmitting = useSelector(getIsCommentSubmitting);

  const { id } = useParams();
  const favoritesCount = offers.filter((offerItem) => offerItem.isFavorite).length;

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  const handleCommentSubmit = (commentData: CommentSubmission) => {
    if (id) {
      dispatch(submitCommentAction({ offerId: id, comment: commentData }))
        .then(() => {
          dispatch(fetchCommentsAction(id));
        });
    }
  };

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

  if (isCurrentOfferLoading) {
    return <Spinner />;
  }

  if (hasCurrentOfferError || !currentOffer) {
    return <NotFoundPage />;
  }

  const nearbyOffersForMap = [currentOffer, ...nearbyOffers];
  const ratingWidth = `${currentOffer.rating * 20}%`;
  const imageCounters: Record<string, number> = {};
  const galleryImages = (currentOffer.images ?? []).map((image) => {
    const nextCount = (imageCounters[image] ?? 0) + 1;
    imageCounters[image] = nextCount;
    return {
      src: image,
      key: `${currentOffer.id}-${image}-${nextCount}`,
    };
  });

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              {authorizationStatus === AuthorizationStatus.Auth && userData ? (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img className="header__avatar user__avatar" src={userData.avatarUrl} width="20" height="20" alt={userData.name} />
                      </div>
                      <span className="header__user-name user__name">{userData.email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={(evt) => {
                        evt.preventDefault();
                        handleLogoutClick();
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="header__nav-list">
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/login">
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages.map((imageItem) => (
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
                <button className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
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
                  {currentOffer.type}
                </li>
                {currentOffer.bedrooms !== undefined && (
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer.bedrooms} Bedrooms
                  </li>
                )}
                {currentOffer.maxAdults !== undefined && (
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} adults
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
            <OfferList offers={nearbyOffers} block="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
