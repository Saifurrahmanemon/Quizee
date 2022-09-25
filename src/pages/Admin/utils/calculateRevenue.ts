import { IOrder } from 'pages/shared/types';

export function calculateRevenue(orders: IOrder[] | [] = []) {
  let totalRevenue = 0;

  for (const order of orders) {
    if (order?.price !== undefined && order?.refund !== 'REFUNDED') {
      totalRevenue += order?.price;
    }
  }

  return { totalRevenue };
}
