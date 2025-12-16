import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import OfferList from '../OfferList/OfferList';
import FavoritesEmptyPage from '../FavoritesEmptyPage/FavoritesEmptyPage';
import { getOffers, getAuthorizationStatus, getUserData } from '../../store/selectors';
import { logoutAction } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import type { Offer } from '../../types/offer';

function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector(getOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  if (favoriteOffers.length === 0) {
    return <FavoritesEmptyPage />;
  }

  const offersByCity: Record<string, Offer[]> = {};
  favoriteOffers.forEach((offer) => {
    (offersByCity[offer.city.name] ??= []).push(offer);
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
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
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
