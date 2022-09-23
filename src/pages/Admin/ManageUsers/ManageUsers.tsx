import { Container, Paper, ScrollArea, Table } from '@mantine/core';
import Loading from 'components/Loading';
import useUsers from 'hooks/useUsers';
import { useState } from 'react';
import { useStyles } from './ManageUsers.style';

type UserType = {
	name: string;
	email: string;
	role?: boolean;
};

function ManageUsers() {
	const [scrolled, setScrolled] = useState(false);
	const { classes, cx } = useStyles();
	const { users, loading } = useUsers();

	const theads = (
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Payment Status</th>
		</tr>
	);

	const rows = users.map((user: UserType) => (
		<tr key={user.email}>
			<td>{user.name === null ? 'No Name' : user.name}</td>
			<td>{user.email}</td>
			<td>Transaction Id</td>
		</tr>
	));

	const showTableInfo = loading ? (
		<Loading />
	) : (
		<Table
			striped
			highlightOnHover
			horizontalSpacing='md'
			verticalSpacing='md'
			captionSide='top'
			my={20}
			sx={{ minWidth: 500 }}
		>
			<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>{theads}</thead>
			<tbody>{rows}</tbody>
		</Table>
	);

	return (
		<Container>
			<Paper shadow='xs' p='md' my={20}>
				{' '}
				<ScrollArea sx={{ height: 400 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
					{showTableInfo}
				</ScrollArea>
			</Paper>
		</Container>
	);
}

export default ManageUsers;
