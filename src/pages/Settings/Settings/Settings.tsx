import axios from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import QuizzesTable from '../components/QuizzesTable';

function Settings() {
	const [isLoading, setIsLoading] = useState(false);
	const [paidQuizzes, setPaidQuizzes] = useState([]);
	const [user] = useAuthState(auth);

	console.log(paidQuizzes);

	useEffect(() => {
		setIsLoading(true);
		const getQuiz = async () => {
			const res = await axios.get(`/orders/${user?.email}`);
			if (res.status === 200) {
				setPaidQuizzes(res?.data);
			}
			setIsLoading(false);
		};

		getQuiz();
	}, []);

	return <div>{isLoading ? <Loading /> : <QuizzesTable quizzes={paidQuizzes} />}</div>;
}

export default Settings;
