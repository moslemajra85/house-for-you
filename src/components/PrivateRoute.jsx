import { Navigate, Outlet } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

import useAuthStatus from '../hooks/useAuthStatus';
const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) return <Puff />;

  loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
