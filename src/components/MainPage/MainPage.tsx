import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import OfferList from '../OfferList/OfferList';
import Map from '../Map/Map';
import CityList from '../CityList/CityList';
import SortingOptions from '../SortingOptions/SortingOptions';
import Spinner from '../Spinner/Spinner';
import Header from '../Header/Header';
import MainEmptyPage from '../MainEmptyPage/MainEmptyPage';
import { changeCity, changeSortingType, fetchOffersAction, setHoveredOfferId, logoutAction } from '../../store/action';
import { getCity, getHasOffersLoadingError, getHoveredOfferId, getIsOffersLoading, getOffers, getOffersByCity, getSortingType, getAuthorizationStatus, getUserData, getSortedOffers, getFavoriteOffersCount } from '../../store/selectors';
import { SortingType } from '../../const';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const activeCityName = useSelector(getCity);
  const offers = useSelector(getOffers);
  const cityOffers = useSelector(getOffersByCity);
  const sortingType = useSelector(getSortingType);
  const activeOfferId = useSelector(getHoveredOfferId);
  const isOffersLoading = useSelector(getIsOffersLoading);
  const hasOffersLoadingError = useSelector(getHasOffersLoadingError);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);
  const sortedCityOffers = useSelector(getSortedOffers);

  const city = useMemo(() => cityOffers[0]?.city ?? offers[0]?.city, [cityOffers, offers]);

  const handleCityChange = useCallback((cityName: string) => {
    dispatch(changeCity(cityName));
  }, [dispatch]);

  const handleOfferHover = useCallback((offerId: string | null) => {
    dispatch(setHoveredOfferId(offerId));
  }, [dispatch]);

  const handleSortingTypeChange = useCallback((nextSortingType: SortingType) => {
    dispatch(changeSortingType(nextSortingType));
  }, [dispatch]);

  const handleLogoutClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
        favoriteCount={favoriteOffersCount}
        onLogoutClick={handleLogoutClick}
        isLogoActive
      />

      {isOffersLoading && (
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <Spinner />
        </main>
      )}
      {hasOffersLoadingError && !isOffersLoading && (
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <section className="page__error">
            <h1 className="page__error-title">Server is not available</h1>
            <p className="page__error-description">Please try to reload the page later.</p>
          </section>
        </main>
      )}
      {!isOffersLoading && !hasOffersLoadingError && cityOffers.length === 0 && (
        <MainEmptyPage activeCity={activeCityName} cities={CITIES} onCityChange={handleCityChange} />
      )}
      {!isOffersLoading && !hasOffersLoadingError && cityOffers.length > 0 && (
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
              {city && (
                <div className="cities__right-section">
                  <section className="cities__map map" data-active-offer={activeOfferId ?? ''}>
                    <Map city={city} offers={sortedCityOffers} activeOfferId={activeOfferId} />
                  </section>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default MainPage;
