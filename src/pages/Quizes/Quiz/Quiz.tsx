import {
   Button,
   Center,
   Container,
   createStyles,
   Divider,
   Group,
   Menu,
   Paper,
   Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TEST_URL } from '../../../api/Api';
import axiosPrivate from '../../../api/AxiosPrivate';
import { IQuize } from '../../../Types/QuizesTypes';
import Timer from '../components/Timer';

const useStyles = createStyles((theme) => ({
   item: {
      '&[data-active]': {
         backgroundColor: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
         color: theme.white,
      },
   },
}));

//* aaaah!! this component is getting too nasty, poor performance
function Quiz() {
   const { id } = useParams();
   const [timer, setTimer] = useState(0);
   const [questions, setQuestions] = useState<IQuize[] | []>([]);
   const [questionNumber, setQuestionNumber] = useState(0);
   const [timeOver, setTimeOver] = useState(true);
   const [userAnswer, setUserAnswer] = useState([]);
   const [initialUI, setInitialUI] = useState(true);
   const [loading, setLoading] = useState(false);
   const { classes } = useStyles();

   useEffect(() => {
      setLoading(true);
      const getQuiz = async () => {
         const res = await axiosPrivate.get(`${TEST_URL}/quizes/${id}`);
         if (res.status === 200) {
            setQuestions(res.data.quiz);
            const minuteToMiliSecond = res.data?.time * 60000;
            setTimer(minuteToMiliSecond);
         }
         setLoading(false);
      };

      getQuiz();
   }, []);

   const handleTimer = () => {
      setTimer((prev) => prev - 1000);
   };

   const handleQuizStart = () => {
      setTimeOver(false);
      setInitialUI(false);
   };
   const handleNextQuiz = () => {
      console.log(questionNumber);
      if (questionNumber < questions.length) {
         setQuestionNumber((prev) => prev + 1);
      }
      if (questionNumber === questions.length) {
         setTimeOver(true);
      }
   };
   const renderQuestion = questions[questionNumber];

   const displayOptions = renderQuestion?.options.map((option) => (
      <>
         <Menu.Item key={option.value}>{option.value}</Menu.Item>
         <Menu.Divider />
      </>
   ));

   const quizInfo = initialUI ? (
      <Paper my={20} radius='md' p='md' withBorder>
         <Center inline={false}>
            <Text>Play Start Button When You Are Ready</Text>
            <Button variant='outline' onClick={handleQuizStart} mx={30}>
               Start
            </Button>
         </Center>
      </Paper>
   ) : (
      <>
         <Paper my={20} radius='md' p='md' withBorder>
            <Text> {renderQuestion?.question}</Text>
         </Paper>
         <Text size='sm' color='gray' my={20}>
            Please Chose any question
         </Text>
         <Menu classNames={classes} radius='md'>
            {displayOptions}
         </Menu>
         <Divider my='sm' />
         <Group position='right'>
            <Button onClick={handleNextQuiz} variant='gradient' px={20}>
               Next
            </Button>
         </Group>
      </>
   );

   const numberOfQuestions = <Text>Number of Question {questions.length} </Text>;

   return (
      <Container>
         <Paper
            radius='md'
            withBorder
            p='lg'
            sx={(theme) => ({
               backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}
         >
            <Group position='apart'>
               <Paper radius='md' p='md' withBorder>
                  {numberOfQuestions}
               </Paper>
               <Paper radius='md' p='sm' withBorder>
                  <Timer time={timer} timeOver={timeOver} setTime={handleTimer}></Timer>
               </Paper>
            </Group>
            {quizInfo}
         </Paper>
      </Container>
   );
}

export default Quiz;
