import { Badge, Group, ScrollArea, Table, Text } from '@mantine/core';
import getPaidOrders from 'pages/Admin/api/getPaidOrders';
import { updateOrder } from 'pages/Quiz/api';
import { IOrder } from 'pages/shared/types';
import { useState } from 'react';
import { Email, Id } from 'types';
import { useStyles } from './OrdersTable.style';

function OrdersTable() {
	const [scrolled, setScrolled] = useState(false);
	const { orders, refetch } = getPaidOrders();
	const { classes, cx } = useStyles();

	const handleOnRefund = async (userEmail: Email, id: Id) => {
		const status = 'REFUNDED' as const;
		const order = {
			refund: status,
		};
		await updateOrder(userEmail, id, order);
		refetch();
	};

	const noRefundBadge = (
		<Badge color='gray' variant='light' size='xs' fullWidth>
			No Refund
		</Badge>
	);

	const refundedBadge = (
		<Badge variant='light' color='indigo' size='xs' fullWidth>
			Refunded
		</Badge>
	);

	const rows = orders?.map((order: IOrder) => (
		<tr key={order._id}>
			<td>
				<Group spacing='sm'>
					<div>
						<Text size='sm' weight={500}>
							{order?.email}
						</Text>
						<Text size='xs' color='dimmed'>
							Trans ID: {order?.transactionId}
						</Text>
					</div>
				</Group>
			</td>

			<td>
				<Text size='sm' weight={600}>
					${order?.price}
				</Text>
			</td>
			<td>
				<Text size='sm' weight={600}>
					{order?.quizName}
				</Text>
			</td>
			<td>
				{order?.refund === 'PENDING' ? (
					<Badge
						color='red'
						onClick={() => handleOnRefund(order?.email, order?.quizId)}
						className={classes.badge}
						variant='light'
						fullWidth
					>
						Pending
					</Badge>
				) : order?.refund === 'REFUNDED' ? (
					refundedBadge
				) : (
					noRefundBadge
				)}
			</td>
		</tr>
	));

	const theads = (
		<tr>
			<th>Email</th>
			<th>Price</th>
			<th>Quiz Name</th>
			<th>Refund</th>
		</tr>
	);

	return (
		<ScrollArea
			scrollbarSize={2}
			className={classes.fullHeight}
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
		>
			<Table highlightOnHover sx={{ minWidth: 500 }} verticalSpacing='xs'>
				<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>{theads}</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea>
	);
}

export default OrdersTable;
