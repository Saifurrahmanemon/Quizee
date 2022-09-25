import axios from 'api/AxiosPrivate';
import { useQuery } from 'react-query';
import { Email, Id } from 'types';

const useGetOrder = (email: Email, id: Id) => {
  const fetchOrder = async () => await axios.get(`/orders/${email}/${id}`);
  const { data, isLoading, refetch } = useQuery(['order', [email, id]], fetchOrder);
  const order = data?.data;
  return { order, isLoading, refetch };
};

export default useGetOrder;
