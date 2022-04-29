import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnAuthenticatedRoutes from './UnAuthenticatedRoutes';

const RootRoute = () => {
  return (
    <>
      <UnAuthenticatedRoutes />
      <AuthenticatedRoutes />
    </>
  );
};

export default RootRoute;
