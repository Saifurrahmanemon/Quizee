import axios from 'api/AxiosPrivate';
import { useQuery } from 'react-query';

function getPaidOrders() {
	const fetchOrders = async () => await axios.get('/orders/paid');
	const { data, isLoading, refetch } = useQuery(['paid'], fetchOrders);
	const orders = data?.data;
	return { orders, isLoading, refetch };
}

export default getPaidOrders;
