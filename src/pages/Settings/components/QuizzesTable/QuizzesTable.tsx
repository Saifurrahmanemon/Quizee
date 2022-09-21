import { Badge, Button, Container, Group, Paper, ScrollArea, Table, Text } from '@mantine/core';
import { IOrder } from 'pages/shared/types';
import { ReportMoney } from 'tabler-icons-react';

interface UsersTableProps {
	quizzes: IOrder[];
}

function QuizzesTables({ quizzes }: UsersTableProps) {
	const handleOnRefund = () => {
		console.log('ready refund');
	};

	const rows = quizzes.map((item) => (
		<tr key={item?.quizName}>
			<td>
				<Group spacing='sm'>
					<div>
						<Text size='sm' weight={500}>
							{item?.quizName}
						</Text>
					</div>
				</Group>
			</td>

			<td>
				<Badge size='lg' radius='md'>
					${item?.price}
				</Badge>
			</td>
			<td>
				<Text weight={700}>{item?.retakes}</Text>
			</td>
			<td>
				<Badge size='md' color='violet' variant='outline'>
					{item?.transactionId}
				</Badge>
			</td>
			<td>
				<Button
					onClick={handleOnRefund}
					compact
					leftIcon={<ReportMoney size={16} />}
					size='sm'
					variant='light'
				>
					Request
				</Button>
			</td>
		</tr>
	));

	const theads = (
		<tr>
			<th>Quiz Name</th>
			<th>Price</th>
			<th>Retakes</th>
			<th>Transaction Id</th>
			<th>Refund</th>
		</tr>
	);

	return (
		<Container>
			<Paper shadow='xs' p='md' my={40}>
				<ScrollArea>
					<Table sx={{ minWidth: 800 }} verticalSpacing='sm' horizontalSpacing='xs'>
						<thead>{theads}</thead>
						<tbody>{rows}</tbody>
					</Table>
				</ScrollArea>
			</Paper>
		</Container>
	);
}

export default QuizzesTables;
