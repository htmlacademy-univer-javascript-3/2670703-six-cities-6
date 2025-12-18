import type React from 'react';
import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { changeCity, loginAction, logoutAction } from '../../store/action';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, getFavoriteOffersCount, getUserData } from '../../store/selectors';
import Header from '../header/header';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;

function isPasswordValid(password: string): boolean {
  return PASSWORD_PATTERN.test(password);
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [randomCity] = useState(() => {
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    return CITIES[randomIndex];
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isPasswordValid(password)) {
      return;
    }

    dispatch(loginAction({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        // Error handling is done by the reducer
      });
  };

  const handleRandomCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    navigate('/');
  };

  return (
    <div className="page page--gray page--login">
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
        favoriteCount={favoriteOffersCount}
        onLogoutClick={() => {
          dispatch(logoutAction());
        }}
      />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/" onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
