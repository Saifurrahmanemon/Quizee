import axios from 'api/AxiosPrivate';
import { IOrder } from '../types';

type Email = string | null | undefined;
type Id = string | undefined;

export const updateOrder = async (email: Email, id: Id, order: IOrder) => {
	const res = await axios.put(`/orders/${email}/${id}`, order);
	return res;
};
