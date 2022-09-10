import {
   Button,
   Center,
   Checkbox,
   Container,
   createStyles,
   Divider,
   Group,
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
   rowSelected: {
      backgroundColor:
         theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
            : theme.colors[theme.primaryColor][0],
   },
}));

//* aaaah!! this component is getting too nasty, poor performance

function Quiz() {
   const { id } = useParams();
   const [timer, setTimer] = useState(0);
   const [questions, setQuestions] = useState<IQuize[] | []>([]);
   const [questionNumber, setQuestionNumber] = useState(0);
   const [timeOver, setTimeOver] = useState(true);
   const { classes, cx } = useStyles();
   const [selection, setSelection] = useState(['1']);
   const [userAnswer, setUserAnswer] = useState([]);
   const [showEnd, setShowEnd] = useState(false);
   const [initialUI, setInitialUI] = useState(true);
   const [loading, setLoading] = useState(false);
   const [checked, setChecked] = useState(false);

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
      if (questionNumber < questions.length) {
         setQuestionNumber((prev) => prev + 1);
      }
      if (questionNumber + 1 === questions.length) {
         setTimeOver(true);
         setShowEnd(true);
      }
   };
   const renderQuestion = questions[questionNumber];

   const displayOptions = renderQuestion?.options.map((option) => (
      <Checkbox
         key={option.value}
         checked={checked}
         value={option.value}
         label={option.label}
         onChange={(event) => setChecked(event.currentTarget.checked)}
      />
   ));

   const showEndMssge = (
      <Center my={30}>
         <Text p={20} size='lg'>
            Thank you very much for participating in the quiz we are in development so cannot show
            the score
         </Text>
      </Center>
   );

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
         <Checkbox.Group>{displayOptions}</Checkbox.Group>
         <Divider my='sm' />
         <Group position='right'>
            <Button onClick={handleNextQuiz} variant='gradient' px={20}>
               Next
            </Button>
         </Group>
      </>
   );

   const isQuizEnd = showEnd ? showEndMssge : quizInfo;

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
            {isQuizEnd}
         </Paper>
      </Container>
   );
}

export default Quiz;
