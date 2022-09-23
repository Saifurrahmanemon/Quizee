/**
 *
 * TODO:Total paid and unpaid users and revenue
 * TODO:see quiz data for example number of submissions, results, grades etc
 * TODO:See quiz payments transactions and refund someone fully if needed.
 * TODO:show total submission from user
 */

// * basically we will keep a table component where all paid users will be fetch and we can also see if they want a refund or not if they want a refund then we can refund theme
//* total paid user and total unpaid user in different element together and number of submission
//* total revenue to different component

import { Box, Container, Grid } from '@mantine/core';
import OrdersTable from './components/OrdersTable';
import Revenue from './components/Revenue';
import UsersInfo from './components/UsersInfo';
import { useStyles } from './Dashboard.style';

function Dashboard() {
	const { classes } = useStyles();
	return (
		<Container my='lg'>
			<div>
				<Revenue />
			</div>
			<Grid gutter='xs' my={5}>
				<Grid.Col sm={8} span={12}>
					<Box className={classes.fullHeight}>
						<OrdersTable />
					</Box>
				</Grid.Col>
				<Grid.Col sm={4} span={12}>
					<Box className={classes.halfHeight}>
						<UsersInfo />
					</Box>
				</Grid.Col>
			</Grid>
		</Container>
	);
}

export default Dashboard;
