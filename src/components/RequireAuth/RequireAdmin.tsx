import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import { signOut } from 'firebase/auth';
import useAdmin from 'hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';

type RequireAdminProps = {
	children: JSX.Element;
};
export const RequireAdmin = ({ children }: RequireAdminProps) => {
	const [user, loading] = useAuthState(auth);
	const [admin, adminLoading] = useAdmin(user);
	const location = useLocation();

	if (loading || adminLoading) {
		return <Loading />;
	}

	if (!user || !admin) {
		signOut(auth);
		return <Navigate to='/register' state={{ from: location }} replace></Navigate>;
	}
	return children;
};
