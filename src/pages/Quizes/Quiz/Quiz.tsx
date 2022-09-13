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
import ShowAnswers from '../ShowAnswers';

/*
TODO: for you can choose multiple answers not single we can use radio for single answer and checkbox for multiple


*/

const useStyles = createStyles((theme) => ({
   rowSelected: {
      backgroundColor:
         theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
            : theme.colors[theme.primaryColor][0],
   },
}));

export type CompareAnswerType = {
   question: string;
   userAnswers: string[] | [];
   correctAnswer: string[] | [];
   point: number;
};

//* aaaah!! this component is getting too nasty, poor performance

function Quiz() {
   const { id } = useParams();
   const [timer, setTimer] = useState(0);
   const [questions, setQuestions] = useState<IQuize[] | []>([]);
   const [questionNumber, setQuestionNumber] = useState(0);
   const [timeOver, setTimeOver] = useState(true);
   const [allQuestionAnswers, setAllQuestionAnswers] = useState<CompareAnswerType[] | []>([]);
   const [showEnd, setShowEnd] = useState(false);
   const [initialUI, setInitialUI] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [checkedValues, setCheckedValues] = useState<string[]>([]);

   useEffect(() => {
      setIsLoading(true);
      const getQuiz = async () => {
         const res = await axiosPrivate.get(`${TEST_URL}/quizes/${id}`);
         if (res.status === 200) {
            setQuestions(res.data.quiz);
            const minuteToMiliSecond = res.data?.time * 60000;
            setTimer(minuteToMiliSecond);
         }
         setIsLoading(false);
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

   // show question based on question number

   const renderQuestion = questions[questionNumber];

   const handleNextQuiz = () => {
      if (questionNumber < questions.length) {
         // check if user answer is correct or not
         const result =
            checkedValues.length === renderQuestion?.correct.length &&
            checkedValues.every((value, index) => value === renderQuestion?.correct[index]);

         const point = result === true ? 1 : 0;

         const compareAnswer = {
            question: renderQuestion?.question,
            userAnswers: checkedValues,
            correctAnswer: renderQuestion.correct,
            point,
         };

         const updatedAnswers = [...allQuestionAnswers, compareAnswer];

         setAllQuestionAnswers(updatedAnswers);
         setQuestionNumber((prev) => prev + 1);
         setCheckedValues([]);
      }

      if (questionNumber === questions.length - 1) {
         setTimeOver(true);
         setShowEnd(true);
      }
   };

   const displayOptions = renderQuestion?.options.map((option) => (
      <Checkbox key={option.value} label={option.label} value={option.value}>
         {option.label}
      </Checkbox>
   ));

   const showEndResult = <ShowAnswers allQuestionAnswers={allQuestionAnswers} />;

   // if there is multiple answer user can select multiple option
   const multipleAnswer = renderQuestion?.correct?.length > 1 ? false : true;

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
         <Checkbox.Group value={checkedValues} onChange={setCheckedValues}>
            {displayOptions}
         </Checkbox.Group>
         <Divider my='sm' />
         <Group position='right'>
            <Button onClick={handleNextQuiz} variant='gradient' px={20}>
               Next
            </Button>
         </Group>
      </>
   );

   const isQuizEnd = showEnd ? showEndResult : quizInfo;

   const numberOfQuestions = (
      <>
         <Text italic span>
            Number of Questions:{' '}
         </Text>
         <Text weight={600} span inline>
            {questions.length}/{questionNumber}
         </Text>
      </>
   );

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
                  <Timer time={timer} timeOver={timeOver} setTime={handleTimer} />
               </Paper>
            </Group>
            {isQuizEnd}
         </Paper>
      </Container>
   );
}

export default Quiz;
