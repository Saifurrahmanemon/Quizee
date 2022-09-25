import axios from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import QuizzesTable from '../components/QuizzesTable';
import { useStyles } from './Settings.style';

function Settings() {
  const { classes } = useStyles();

  const [user] = useAuthState(auth);

  const getQuiz = async () => await axios.get(`/orders/${user?.email}`);

  const { data, isLoading, refetch } = useQuery(['orders'], getQuiz);

  const emptyTable = (
    <div className={classes.label}>You don&apos;t have any paid quiz</div>
  );

  const isPaidQuizEmpty = data?.data?.length === 0;

  const showQuizzesTable = isPaidQuizEmpty ? (
    emptyTable
  ) : isLoading ? (
    <Loading />
  ) : (
    <QuizzesTable refetch={refetch} quizzes={data?.data} />
  );

  return <div>{showQuizzesTable}</div>;
}

export default Settings;
