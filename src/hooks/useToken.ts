import axios from 'api/AxiosPrivate';
import { UserCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';

export type UserProps = UserCredential | null | undefined;

const useToken = (user: UserProps) => {
	const [token, setToken] = useState('');

	useEffect(() => {
		const getToken = async () => {
			const info = user?.user;
			const email = info?.email;
			const userInfo = {
				email,
				name: user?.user.displayName,
			};

			if (email) {
				const res = await axios.put(`/users/${email}`, userInfo);
				// set token to state to get access
				setToken(res.data.accessToken);
				localStorage.setItem('accessToken', res.data.accessToken);
			}
		};
		getToken();
	}, [user]);
	return [token];
};

export default useToken;
