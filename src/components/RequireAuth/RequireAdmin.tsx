import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import { signOut } from 'firebase/auth';
import useAdmin from 'hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

type RequireAdminProps = {
	children: JSX.Element;
};
export const RequireAdmin = ({ children }: RequireAdminProps) => {
	const [user, loading] = useAuthState(auth);
	const [admin, adminLoading] = useAdmin(user);

	if (loading || adminLoading) {
		return <Loading />;
	}

	if (user && !admin) {
		showNotification({
			title: 'Sorry!!!',
			message: 'Only admins can see this page',
			icon: <IconX />,
		});
		signOut(auth);
		return <Navigate to='/register'></Navigate>;
	}
	return children;
};
