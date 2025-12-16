import { Routes, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import OfferPage from '../OfferPage/OfferPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { Offer } from '../../mocks/offers';

type AppProps = {
  offers: Offer[];
};

function App({ offers }: AppProps) {
  return (
    <Routes>
      <Route path="/" element={<MainPage offers={offers} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferPage offers={offers} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
