import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../config/firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Loading';

type RequireAdminProps = {
	children: JSX.Element;
};
const RequireAdmin = ({ children }: RequireAdminProps) => {
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

export default RequireAdmin;
