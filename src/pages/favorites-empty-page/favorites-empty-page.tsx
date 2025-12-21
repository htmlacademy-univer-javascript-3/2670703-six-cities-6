import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { getAuthorizationStatus, getFavoriteOffersCount, getUserData } from '../../store/selectors';
import { logoutAction } from '../../store/action';
import Header from '../../components/header/header';

function FavoritesEmptyPage() {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="page page--favorites-empty">
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
        favoriteCount={favoriteOffersCount}
        onLogoutClick={handleLogoutClick}
      />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesEmptyPage;
