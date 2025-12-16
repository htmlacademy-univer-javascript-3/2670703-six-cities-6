import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';
import Spinner from '../Spinner/Spinner';

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
