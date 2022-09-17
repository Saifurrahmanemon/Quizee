import { Container, Paper, ScrollArea, Table } from '@mantine/core';
import axios from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useStyles } from './ManageUsers.style';

type UserType = {
	name: string;
	email: string;
	role?: boolean;
};

function ManageUsers() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);
	const [scrolled, setScrolled] = useState(false);
	const { classes, cx } = useStyles();

	useEffect(() => {
		setLoading(true);
		const getQuiz = async () => {
			const res = await axios.get(`/users/${user?.email}`);
			if (res.status === 200) {
				setUsers(res.data);
			}
			setLoading(false);
		};

		getQuiz();
	}, []);

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
