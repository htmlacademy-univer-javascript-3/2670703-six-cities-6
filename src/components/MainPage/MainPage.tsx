import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OfferList from '../OfferList/OfferList';
import Map from '../Map/Map';
import CityList from '../CityList/CityList';
import { changeCity } from '../../store/action';
import { getCity, getOffers, getOffersByCity } from '../../store/selectors';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

function MainPage() {
  const dispatch = useDispatch();
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  const activeCityName = useSelector(getCity);
  const offers = useSelector(getOffers);
  const cityOffers = useSelector(getOffersByCity);
  const city = cityOffers[0]?.city ?? offers[0]?.city;

  const handleCityChange = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const handleOfferHover = (offerId: number | null) => {
    setActiveOfferId(offerId);
  };

  const handleSortingToggle = () => {
    setIsSortingOpen((prevState) => !prevState);
  };

  const handleSortingOptionClick = () => {
    setIsSortingOpen(false);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList cities={CITIES} activeCity={activeCityName} onCityChange={handleCityChange} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {activeCityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0} onClick={handleSortingToggle}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}>
                  <li className="places__option places__option--active" tabIndex={0} onClick={handleSortingOptionClick}>Popular</li>
                  <li className="places__option" tabIndex={0} onClick={handleSortingOptionClick}>Price: low to high</li>
                  <li className="places__option" tabIndex={0} onClick={handleSortingOptionClick}>Price: high to low</li>
                  <li className="places__option" tabIndex={0} onClick={handleSortingOptionClick}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={cityOffers} onOfferHover={handleOfferHover} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" data-active-offer={activeOfferId ?? ''}>
                <Map city={city} offers={cityOffers} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
