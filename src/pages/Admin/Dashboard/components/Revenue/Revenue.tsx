import { createStyles, SimpleGrid } from '@mantine/core';
import useQuizzes from 'hooks/useQuizzes';
import getPaidOrders from 'pages/Admin/api/getPaidOrders';
import { calculateRevenue, getTotalSubmissions } from 'pages/Admin/utils';
import Statistics from './Statistics';

const useStyles = createStyles(() => ({
  root: {
    marginBottom: 20,
  },
}));

function Revenue() {
  const { classes } = useStyles();
  const { orders, isLoading: ordersLoading } = getPaidOrders();
  const { quizzes, isLoading } = useQuizzes();

  const { totalRevenue } = calculateRevenue(orders);
  const { totalSubmissions } = getTotalSubmissions(quizzes);

  const ordersLength = orders?.length;
  const revenue = `$${totalRevenue}`;
  const totalPaidOrders = `${ordersLength}`;
  const submissions = `${totalSubmissions}`;

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Statistics
          isLoading={ordersLoading}
          title={'Revenue'}
          value={revenue}
          diff={40}
        />
        <Statistics
          isLoading={ordersLoading}
          title={'Orders'}
          value={totalPaidOrders}
          diff={24}
        />
        <Statistics
          isLoading={isLoading}
          title={'Submissions'}
          value={submissions}
          diff={10}
        />
      </SimpleGrid>
    </div>
  );
}

export default Revenue;
