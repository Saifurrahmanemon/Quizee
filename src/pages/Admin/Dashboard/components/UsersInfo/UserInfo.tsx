import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight, TablerIcon } from '@tabler/icons';
import axios from 'api/AxiosPrivate';
import useUsers from 'hooks/useUsers';
import { useEffect, useState } from 'react';

interface StatsType {
	label: string;
	stats: number;
	progress: number;
	color: string;
	icon: TablerIcon;
}

const data = [
	{
		label: 'Total Users',
		stats: 0,
		progress: 65,
		color: 'teal',
		icon: IconArrowUpRight,
	},
	{
		label: 'Paid users',
		stats: 0,
		progress: 72,
		color: 'blue',
		icon: IconArrowDownRight,
	},
];

function UsersInfo() {
	const [paidUsers, setPaidUsers] = useState([]);
	const { users } = useUsers();
	// first one paid info so set paid users
	data[0].stats = users?.length;

	// second one paid info so set paid users
	data[1].stats = paidUsers?.length;

	useEffect(() => {
		const getPaidUsers = async () => {
			const res = await axios.get('/orders/users');
			if (res.status === 200) {
				setPaidUsers(res.data);
			}
		};
		getPaidUsers();
	}, []);

	const stats = data.map((stat: StatsType) => {
		const Icon = stat.icon;

		return (
			<Paper withBorder shadow='md' my='sm' radius='md' p='xs' key={stat.label}>
				<Group>
					<RingProgress
						size={100}
						roundCaps
						thickness={8}
						sections={[{ value: stat.progress, color: stat.color }]}
						label={
							<Center>
								<Icon size={22} stroke={1.5} />
							</Center>
						}
					/>

					<div>
						<Text color='dimmed' size='xs' transform='uppercase' weight={700}>
							{stat.label}
						</Text>
						<Text weight={700} size='xl'>
							{stat.stats}
						</Text>
					</div>
				</Group>
			</Paper>
		);
	});

	return (
		<SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
			{stats}
		</SimpleGrid>
	);
}

export default UsersInfo;
