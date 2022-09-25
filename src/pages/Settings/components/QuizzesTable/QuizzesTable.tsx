import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import auth from 'config/firebase.init';
import { updateOrder } from 'pages/Quiz/api';
import { IOrder } from 'pages/shared/types';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReportMoney } from 'tabler-icons-react';
import { Id } from 'types';

interface UsersTableProps {
  quizzes: IOrder[];
  refetch: () => void;
}

function QuizzesTables({ quizzes, refetch }: UsersTableProps) {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleOnRefund = async (id: Id) => {
    setLoading(true);
    const status = 'PENDING' as const;
    const order = {
      refund: status,
    };
    await updateOrder(user?.email, id, order);
    setLoading(false);
    refetch();
  };

  const pendingBadge = (
    <Badge color='red' variant='light'>
      Pending
    </Badge>
  );

  const refundedBadge = (
    <Badge color='indigo' variant='outline'>
      Refunded
    </Badge>
  );

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
        {item?.refund === 'PENDING' ? (
          pendingBadge
        ) : item?.refund === 'REFUNDED' ? (
          refundedBadge
        ) : (
          <Button
            loading={loading}
            onClick={() => handleOnRefund(item?.quizId)}
            compact
            leftIcon={<ReportMoney size={16} />}
            size='sm'
            variant='light'
          >
            Request
          </Button>
        )}
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
          <Table sx={{ minWidth: 800 }} verticalSpacing='md' horizontalSpacing='xs'>
            <thead>{theads}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Container>
  );
}

export default QuizzesTables;
