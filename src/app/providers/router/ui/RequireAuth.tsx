import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }
  return children
}

export default RequireAuth