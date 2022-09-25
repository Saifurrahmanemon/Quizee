/* eslint-disable camelcase */
import { Button, Group, Modal, Text } from '@mantine/core';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'api/AxiosPrivate';
import auth from 'config/firebase.init';
import { IQuiz } from 'pages/shared/types';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

type CheckoutFormProps = {
  quiz: IQuiz | null;
};

// const useStyles = createStyles((theme) => ({
// 	text: {
// 		color: theme.colors.green,
// 		fontSize: theme.fontSizes.sm,

// 		[theme.fn.smallerThan('sm')]: {
// 			fontSize: theme.fontSizes.xs,
// 		},
// 	},
// }));

const CheckoutForm = ({ quiz }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | undefined>('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [opened, setOpened] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const email = user?.email as string | undefined;
  const userName = user?.displayName as string | undefined;

  useEffect(() => {
    const price = quiz?.price;
    axios.post('/create-payment-intent', { price }).then((res) => {
      if (res?.data?.clientSecret) {
        setClientSecret(res?.data?.clientSecret);
      }
    });
  }, [quiz?.price]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    setCardError(error?.message || '');
    setSuccess('');
    setProcessing(true);

    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
            name: userName,
          },
        },
      }
    );

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError('');
      setTransactionId(paymentIntent.id);
      setSuccess('Congrats! Your payment is completed.');

      // store payment on database
      const payment = {
        quizId: quiz?._id,
        price: quiz?.price,
        quizName: quiz?.name,
        paid: true,
        retakes: quiz?.retake,
        transactionId: paymentIntent.id,
      };

      const res = await axios.patch(`/orders/${email}/${quiz?._id}`, payment);
      if (res) {
        setProcessing(false);
      }
    }
  };

  const handleOnClose = () => {
    setOpened(false);
    navigate('/quizzes');
  };

  const showSuccessModal = success && (
    <Modal
      opened={opened}
      onClose={handleOnClose}
      transition='fade'
      centered
      overlayOpacity={0.55}
      size='lg'
      overlayBlur={3}
      transitionDuration={600}
      transitionTimingFunction='ease'
    >
      <Text color='indigo' weight={600}>
        {success}
      </Text>
      <Group my={20} noWrap>
        <Text size='md' color='dimmed' weight={600}>
          Your transaction Id:
        </Text>
        <Text size='md' color='violet' weight={700}>
          {transactionId}
        </Text>
      </Group>
    </Modal>
  );
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        my='sm'
        type='submit'
        size='md'
        loading={processing}
        px={30}
        compact
        variant='light'
        disabled={!stripe || !clientSecret}
      >
        Pay
      </Button>
      {cardError && <Text color='red'>{cardError}</Text>}
      {showSuccessModal}
    </form>
  );
};
export default CheckoutForm;
