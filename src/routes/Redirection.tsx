import { Navigate } from 'react-router';

interface RedirectionRouteParams {
  children: JSX.Element;
  redirectTo: string;
  isLoggedIn: boolean;
}

export const ProtectedRoute = ({
  children,
  isLoggedIn,
  redirectTo
}: RedirectionRouteParams) => {
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export const AuthRedirectToDashboard = ({
  children,
  isLoggedIn,
  redirectTo
}: RedirectionRouteParams) => {
  return !isLoggedIn ? children : <Navigate to={redirectTo} />;
};
