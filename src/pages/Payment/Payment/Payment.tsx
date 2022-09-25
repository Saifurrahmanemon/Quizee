import { Box, Card, Container, Group, Image, Paper, Text } from '@mantine/core';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import getStripe from 'config/stripe';
import { IQuiz } from 'pages/shared/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { useStyles } from './Payment.style';

const stripePromise = getStripe();

function Payment() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = useStyles();
  // const { order } = useGetOrder(user?.email, id);

  useEffect(() => {
    setIsLoading(true);
    const getQuiz = async () => {
      const res = await axios.get(`/quizzes/${id}`);
      setQuiz(res?.data);
      setIsLoading(false);
    };
    getQuiz();
  }, []);

  if (isLoading) return <Loading />;

  const productDetails = (
    <Card withBorder radius='md' p={0} mb='md' className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={quiz?.img} height={140} width={140} />
        <div className={classes.body}>
          <Text transform='uppercase' color='dimmed' weight={700} size='sm'>
            {quiz?.name}
          </Text>
          <Text className={classes.description} mt='xs' mb='md'>
            {quiz?.description}
          </Text>

          <Group position='left' spacing={0}>
            <Text size='lg' color='dimmed'>
              Price:
            </Text>
            <Text weight={600} mx={5} size='lg'>
              ${quiz?.price}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );

  return (
    <Container>
      <h1>Payment for:</h1>
      <Paper shadow='md' radius='md' p='sm' withBorder>
        {productDetails}
        <Box my='xl'>
          <Elements stripe={stripePromise}>
            <CheckoutForm quiz={quiz} />
          </Elements>
        </Box>
      </Paper>
    </Container>
  );
}

export default Payment;
