import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OfferList from '../OfferList/OfferList';
import Map from '../Map/Map';
import CityList from '../CityList/CityList';
import SortingOptions from '../SortingOptions/SortingOptions';
import { changeCity, changeSortingType, setHoveredOfferId } from '../../store/action';
import { getCity, getHoveredOfferId, getOffers, getOffersByCity, getSortingType } from '../../store/selectors';
import { SortingType } from '../../const';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

function MainPage() {
  const dispatch = useDispatch();

  const activeCityName = useSelector(getCity);
  const offers = useSelector(getOffers);
  const cityOffers = useSelector(getOffersByCity);
  const sortingType = useSelector(getSortingType);
  const activeOfferId = useSelector(getHoveredOfferId);
  const city = cityOffers[0]?.city ?? offers[0]?.city;

  const handleCityChange = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const handleOfferHover = (offerId: number | null) => {
    dispatch(setHoveredOfferId(offerId));
  };

  const handleSortingTypeChange = (nextSortingType: SortingType) => {
    dispatch(changeSortingType(nextSortingType));
  };

  const getSortedOffers = (offersToSort: typeof cityOffers, currentSortingType: SortingType) => {
    const sortedOffers = [...offersToSort];

    switch (currentSortingType) {
      case SortingType.PriceLowToHigh:
        return sortedOffers.sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
      case SortingType.PriceHighToLow:
        return sortedOffers.sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
      case SortingType.TopRatedFirst:
        return sortedOffers.sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
      case SortingType.Popular:
      default:
        return sortedOffers;
    }
  };

  const sortedCityOffers = getSortedOffers(cityOffers, sortingType);

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
              <SortingOptions currentSortingType={sortingType} onSortingTypeChange={handleSortingTypeChange} />
              <OfferList offers={sortedCityOffers} onOfferHover={handleOfferHover} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" data-active-offer={activeOfferId ?? ''}>
                <Map city={city} offers={sortedCityOffers} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
