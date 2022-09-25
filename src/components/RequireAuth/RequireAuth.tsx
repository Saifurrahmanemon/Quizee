import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to='/register' state={{ from: location }} replace />;
  }

  if (error) {
    console.log(error);
  }

  return children;
}
