import axios from 'api/AxiosPrivate';
import { IOrder } from 'pages/shared/types';
import { Email, Id } from 'types';

export const updateOrder = async (email: Email, id: Id, order: IOrder) => {
	const res = await axios.put(`/orders/${email}/${id}`, order);
	return res;
};
