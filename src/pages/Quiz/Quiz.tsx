import { Container, Group, Paper, Text } from '@mantine/core';
import axios from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import auth from 'config/firebase.init';
import useGetOrder from 'hooks/useGetOrder';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { IQuiz } from 'types/QuizzesTypes';

import MinToMilliConvertor from 'utils/MinToMilliConvertor';
import whenToShowAnswer from 'utils/whenToShowAnswer';
import { updateOrder } from './api';
import DisplayQuiz from './components/DisplayQuiz';
import FinishRetakes from './components/FinishRetakes';
import QuizStart from './components/QuizStart';
import ShowAnswers from './components/ShowAnswers';
import Timer from './components/Timer';

/*
TODO: for you can choose multiple answers not single we can use radio for single answer and checkbox for multiple

?this points are a bit ambiguous:
!retake in terms of single question or whole quiz.
!which answer will be count after retake latest one right?

? I guess user can for the case answer is after retake users can not see all questions after quiz one option will appear wether to retake the quiz or not if user click retake one retake will be decremented and at the end result will be shown right?

*Admin can set up if user can see answers as they submit the quiz or they need to wait until the end of the quiz questions

*Admin can set if user can see their correct answers as they submit a quiz answer or they have to wait until the end of the all questions

*Admin can set number of retake a user can take.
*Admin can set if users should see the answer at the end of submission, or as they answer the question or they cannot see until all retake is taken

TODO:Answer can be revealed after all the retake is taken or user can choose himself to reveal the answer at the end of the quiz and this will have make a user’s available retake to 0 so that he cannot take any retake

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
	const [isRetakesOver, setIsRetakesOver] = useState(false);
	const [allQuestionAnswers, setAllQuestionAnswers] = useState<CompareAnswerType[] | []>([]);
	const [initialUI, setInitialUI] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [checkedValues, setCheckedValues] = useState<string[]>([]);
	const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);
	const [user] = useAuthState(auth);

	const { order } = useGetOrder(user?.email, id);

	// when to show answer
	const showAnswer = whenToShowAnswer(questionsInfo?.showAnswer);

	const showAnswerPerQuestion = questionsInfo?.showAnswer === 'afterQuestion';
	// timer answer per question
	const showTimerPerQuestion = questionsInfo?.countDownType === 'question';
	// show question based on question number
	const renderQuestion = questions[questionNumber];

	const remainingRetakes = order ? order?.retakes : questionsInfo?.retake;

	// if there is multiple answer user can select multiple option
	// const multipleAnswer = renderQuestion?.correct?.length > 1 ? false : true;

	const isSelected = checkedValues?.length < 1 ? true : false;

	useEffect(() => {
		setIsLoading(true);
		const getQuiz = async () => {
			const res = await axios.get(`/quizzes/${id}`);
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

	const handleQuizStart = async () => {
		const decrementRetakes = remainingRetakes - 1;
		const order = {
			email: user?.email,
			quizId: id,
			quizName: questionsInfo?.name,
			retakes: decrementRetakes,
			price: questionsInfo?.price,
		};
		setIsLoading(true);
		await updateOrder(user?.email, id, order);
		setIsLoading(false);
		setTimeOver(false);
		setInitialUI(false);
	};

	/*
	 *this will show the answer if the answer type is per question
	 */
	const handleShowAnswer = () => {
		setIsCheckboxDisabled(true);
	};

	const handleShowResults = async () => {
		const decrementRetakes = remainingRetakes - remainingRetakes;
		const order = {
			retakes: decrementRetakes,
		};
		const res = await updateOrder(user?.email, id, order);
		console.log(res);
		setIsRetakesOver(true);
	};

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
			setIsCheckboxDisabled(false);
		}

		if (showTimerPerQuestion) {
			const millisecond = MinToMilliConvertor(questionsInfo?.time);
			setTimer(millisecond);
		}

		if (questionNumber === questions.length - 1) {
			setTimeOver(true);
		}
	};

	/*
	 *if the user does not submit answer then this code will move user to next quiz(timer for per question)
	 */
	if (timer === 0 && showTimerPerQuestion) {
		handleNextQuiz();

		if (questionsInfo?.time !== undefined) {
			const millisecond = MinToMilliConvertor(questionsInfo?.time);
			setTimer(millisecond);
		}
	}

	/*
	 *this is for Whole question if time is over auto submit all question..
	 */
	if (timer === 0 && !showTimerPerQuestion) {
		handleNextQuiz();
	}

	const quizInfo = initialUI ? (
		<QuizStart
			toShowAnswer={showAnswer}
			retakes={remainingRetakes}
			handleQuizStart={handleQuizStart}
		/>
	) : (
		<DisplayQuiz
			{...{
				renderQuestion,
				isCheckboxDisabled,
				checkedValues,
				setCheckedValues,
				isSelected,
				handleNextQuiz,
				handleShowAnswer,
				showAnswerPerQuestion,
			}}
		/>
	);
	/*
	 *FinishRetakes component will be only shown when showAnswer type is afterRetakes
	 */
	const showQuizEndUI =
		questionsInfo?.showAnswer === 'afterRetakes' && !isRetakesOver ? (
			<FinishRetakes
				handleShowResults={handleShowResults}
				showAnswer={showAnswer}
				retakes={remainingRetakes}
			/>
		) : (
			<ShowAnswers allQuestionAnswers={allQuestionAnswers} />
		);

	// if Quiz end then show Quiz end UI
	const QuizEnd = questionNumber === questions.length ? showQuizEndUI : quizInfo;

	return (
		<Container>
			{isLoading ? (
				<Loading />
			) : (
				<Paper mt={50} radius='md' shadow='md' withBorder p='lg'>
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
					{QuizEnd}
				</Paper>
			)}
		</Container>
	);
}

export default Quiz;
