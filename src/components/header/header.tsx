import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import type { AuthInfo } from '../../types/auth';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
  userData: AuthInfo | null;
  favoriteCount: number;
  onLogoutClick: () => void;
  isLogoActive?: boolean;
};

function Header({ authorizationStatus, userData, favoriteCount, onLogoutClick, isLogoActive = false }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${isLogoActive ? 'header__logo-link--active' : ''}`} to="/">
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
                    <span className="header__favorite-count">{favoriteCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      onLogoutClick();
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
  );
}

export default Header;
