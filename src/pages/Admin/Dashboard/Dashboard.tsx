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
