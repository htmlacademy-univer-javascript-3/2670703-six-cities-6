import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { checkAuthAction } from '../../store/action';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';

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
