import axios from 'api/AxiosPrivate';
import { useQuery } from 'react-query';

function useQuizzes() {
	const getQuizzes = async () => await axios.get('/quizzes');
	const { data, isLoading, refetch } = useQuery(['quizzes'], getQuizzes);
	const quizzes = data?.data;
	return { quizzes, isLoading, refetch };
}

export default useQuizzes;
