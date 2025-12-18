import { Link } from 'react-router-dom';
import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import OfferList from '../offer-list/offer-list';
import FavoritesEmptyPage from '../favorites-empty-page/favorites-empty-page';
import Header from '../header/header';
import { getFavoriteOffers, getOffersByCityGrouped, getAuthorizationStatus, getUserData } from '../../store/selectors';
import { logoutAction, fetchFavoriteOffersAction } from '../../store/action';

function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteOffers = useSelector(getFavoriteOffers);
  const offersByCity = useSelector(getOffersByCityGrouped);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const handleLogoutClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const favoriteOffersCount = useMemo(() => favoriteOffers.length, [favoriteOffers.length]);

  if (favoriteOffers.length === 0) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
        favoriteCount={favoriteOffersCount}
        onLogoutClick={handleLogoutClick}
      />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  <OfferList offers={cityOffers} block="favorites" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
