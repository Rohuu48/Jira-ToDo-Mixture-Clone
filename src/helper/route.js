import { useLocation } from 'react-router';
import { Navigate } from 'react-router';

export const Redirect = ({ redirect, replace = false }) => {
  const location = useLocation();
  return (
    <Navigate to={redirect} replace={replace} state={{ from: location }} />
  );
};
