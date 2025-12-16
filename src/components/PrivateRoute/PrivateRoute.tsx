import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthorized = false;

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
