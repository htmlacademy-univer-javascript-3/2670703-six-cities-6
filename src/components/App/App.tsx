import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { checkAuthAction } from '../../store/action';
import MainPage from '../MainPage/main-page';
import LoginPage from '../LoginPage/login-page';
import FavoritesPage from '../FavoritesPage/favorites-page';
import OfferPage from '../OfferPage/offer-page';
import NotFoundPage from '../NotFoundPage/not-found-page';
import PrivateRoute from '../PrivateRoute/private-route';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
