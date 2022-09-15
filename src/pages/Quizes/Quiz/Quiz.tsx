import { Button, Center, Checkbox, Container, Divider, Group, Paper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/AxiosPrivate';

import Loading from '../../../components/Loading';
import { IQuiz } from '../../../types/QuizesTypes';
import MinToMilliConvertor from '../../../utils/MinToMilliConvertor';
import Timer from '../components/Timer';
import ShowAnswers from '../ShowAnswers';

/*
TODO: for you can choose multiple answers not single we can use radio for single answer and checkbox for multiple

TODO: Admin can set up if user can see answers as they submit the quiz or they need to wait until the end of the quiz questions
*/

export type CompareAnswerType = {
   question: string;
   userAnswers: string[] | [];
   correctAnswer: string[] | [];
   point: number;
};

function Quiz() {
   const { id } = useParams();
   const [timer, setTimer] = useState(0);
   const [questions, setQuestions] = useState<IQuiz[] | []>([]);
   const [questionsInfo, setQuestionsInfo] = useState<IQuiz | null>(null);
   const [questionNumber, setQuestionNumber] = useState(0);
   const [timeOver, setTimeOver] = useState(true);
   const [allQuestionAnswers, setAllQuestionAnswers] = useState<CompareAnswerType[] | []>([]);
   const [initialUI, setInitialUI] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [checkedValues, setCheckedValues] = useState<string[]>([]);

   const showTimerPerQuestion = questionsInfo?.countDownType === 'question';

   useEffect(() => {
      setIsLoading(true);
      const getQuiz = async () => {
         const res = await axios.get(`/quizes/${id}`);
         if (res.status === 200) {
            setQuestions(res.data.quiz);
            setQuestionsInfo(res.data);
            const millisecond = MinToMilliConvertor(res.data?.time);
            setTimer(millisecond);
         }
         setIsLoading(false);
      };

      getQuiz();
   }, []);

   // reducing 1 second from the timer
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

      if (showTimerPerQuestion) {
         const millisecond = MinToMilliConvertor(questionsInfo?.time);
         setTimer(millisecond);
      }

      if (questionNumber === questions.length - 1) {
         setTimeOver(true);
      }
   };

   // if the user does not submit answer then this code will move user to next quiz(timer for per question)
   if (timer === 0 && showTimerPerQuestion) {
      handleNextQuiz();

      if (questionsInfo?.time !== undefined) {
         const millisecond = MinToMilliConvertor(questionsInfo?.time);
         setTimer(millisecond);
      }
   }

   // this is for Whole question if time is over auto submit all question..

   if (timer === 0 && !showTimerPerQuestion) {
      handleNextQuiz();
   }

   // if there is multiple answer user can select multiple option
   // const multipleAnswer = renderQuestion?.correct?.length > 1 ? false : true;
   const isOptionSelected = checkedValues?.length < 1 ? true : false;

   const displayOptions = renderQuestion?.options.map((option, idx) => (
      <Checkbox key={`${option.value} ${idx}`} label={option.label} value={option.value}>
         {option.label}
      </Checkbox>
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
         <Checkbox.Group value={checkedValues} onChange={setCheckedValues}>
            {displayOptions}
         </Checkbox.Group>
         <Divider my='sm' />
         <Group position='right'>
            <Button disabled={isOptionSelected} onClick={handleNextQuiz} variant='gradient' px={20}>
               Next
            </Button>
         </Group>
      </>
   );

   // if Quiz end then show Quiz end UI
   const isQuizEnd =
      questionNumber === questions.length ? (
         <ShowAnswers allQuestionAnswers={allQuestionAnswers} />
      ) : (
         quizInfo
      );

   return (
      <Container>
         {isLoading ? (
            <Loading />
         ) : (
            <Paper radius='md' withBorder p='lg'>
               <Group position='apart'>
                  <Paper radius='md' p='md' withBorder>
                     <Text italic span>
                        Number of Questions:{' '}
                     </Text>
                     <Text weight={600} span inline>
                        {questions.length}/{questionNumber}
                     </Text>
                  </Paper>
                  <Paper radius='md' p='sm' withBorder>
                     <Timer time={timer} timeOver={timeOver} setTime={handleTimer} />
                  </Paper>
               </Group>
               {isQuizEnd}
            </Paper>
         )}
      </Container>
   );
}

export default Quiz;
