import { Routes, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import OfferPage from '../OfferPage/OfferPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

function App() {
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
