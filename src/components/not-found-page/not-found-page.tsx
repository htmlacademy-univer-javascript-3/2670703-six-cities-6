import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { getAuthorizationStatus, getFavoriteOffersCount, getUserData } from '../../store/selectors';
import { logoutAction } from '../../store/action';
import Header from '../header/header';

function NotFoundPage() {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);

  return (
    <div className="page page--gray page--not-found">
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
        favoriteCount={favoriteOffersCount}
        onLogoutClick={() => {
          dispatch(logoutAction());
        }}
      />
      <main className="page__main">
        <div className="container">
          <section className="not-found">
            <h1 className="not-found__title">404 Not Found</h1>
            <p className="not-found__description">
              These aren&apos;t the droids you are looking for.
            </p>
            <Link className="not-found__link" to="/">
              Go to main page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
