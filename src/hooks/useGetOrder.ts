import axios from 'api/AxiosPrivate';
import { useQuery } from 'react-query';

const useGetOrder = (email: string | null | undefined, id: string | undefined) => {
	const fetchOrder = async () => await axios.get(`/orders/${email}/${id}`);
	const { data, isLoading, refetch } = useQuery(['order', email], fetchOrder);
	const order = data?.data;
	return { order, isLoading, refetch };
};

export default useGetOrder;
