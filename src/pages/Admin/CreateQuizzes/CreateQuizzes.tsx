import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	MultiSelect,
	NumberInput,
	Select,
	SimpleGrid,
	Textarea,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import axios from 'api/AxiosPrivate';
import auth from 'config/firebase.init';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ICreateQuizzes, QuizType } from 'types/CreateQuizzesTypes';
import Dropzone from '../components/Dropzone';
import QuestionsPopover from '../components/QuestionsPopover';

import { useStyles } from './CreateQuizzes.style';

type OptionState = {
	value: string;
	label: string;
};

function CreateQuizzes() {
	const [questions, setQuestions] = useDebouncedState<QuizType[] | []>([], 1000);
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState<OptionState[] | []>([]);
	const [answers, setAnswers] = useState<string[] | []>([]);
	const [image, setImage] = useState('');
	const [loading, setLoading] = useState(false);
	const [user] = useAuthState(auth);
	const { classes } = useStyles();

	const form = useForm<ICreateQuizzes>({
		initialValues: {
			name: '',
			description: '',
			img: '',
			status: '',
			retake: 0,
			countDownType: '',
			showAnswer: '',
			price: 0,
			time: 0,
			quiz: [
				{
					question: '',
					options: [
						{
							value: '',
							label: '',
						},
					],
					correct: [''],
				},
			],
		},
	});

	const handleOnQuestionCreate = () => {
		setLoading(true);
		const getQuestion = {
			question,
			options,
			correct: answers,
		};
		const updatedQuestion = [...questions, getQuestion];
		setQuestions(updatedQuestion);
		setQuestion('');
		setOptions([]);

		showNotification({
			title: 'Question Added successfully',
			message: 'Hey there, your question is added! 🤥',
		});
		setLoading(false);
	};

	// push question to our database

	const handleOnQuizCreate = async (values: ICreateQuizzes) => {
		setLoading(true);
		values.img = image;
		values.quiz = questions;
		const res = await axios.post(`/quizzes/${user?.email}`, values);

		if (res.status === 200) {
			showNotification({
				title: 'Congrats!! 😃😃 ',
				message: 'You created a new quiz',
			});

			form.reset();
			setQuestions([]);
		}
		setLoading(false);
	};

	const showQuestionsPopover = questions?.map((item) => (
		<QuestionsPopover
			item={item}
			key={item.question}
			setQuestions={setQuestions}
			questions={questions}
		/>
	));

	const disableAddQuestion = question.length <= 2 || answers.length < 1;
	const disableAddQuiz = questions.length < 1;

	// add question our all questions state
	const questionInputs = (
		<div>
			<Textarea
				label='Question '
				placeholder='Type your Question here'
				value={question}
				onChange={(event) => setQuestion(event.currentTarget.value)}
				autosize
				my={10}
				minRows={2}
				maxRows={4}
			/>
			<SimpleGrid mb={10} cols={2}>
				<MultiSelect
					label='Chose options for the question'
					data={options}
					placeholder='Select items'
					searchable
					creatable
					getCreateLabel={(query) => `+ Create ${query}`}
					onCreate={(query) => {
						const item = { value: query, label: query };
						setOptions((current) => [...current, item]);
						return item;
					}}
				/>{' '}
				<MultiSelect
					data={options}
					creatable
					onChange={(value) => setAnswers(value)}
					label='chose the answer'
					placeholder='chose multiple if answer is multiple'
				/>
			</SimpleGrid>

			<Center>
				<Button
					disabled={disableAddQuestion}
					onClick={handleOnQuestionCreate}
					loading={loading}
					variant='filled'
					size='xs'
					mt='sm'
				>
					Add Question
				</Button>
			</Center>
		</div>
	);

	return (
		<Container>
			<Box my={20} px='xs'>
				<h1>Add Quizzes:</h1>
				<form onSubmit={form.onSubmit(handleOnQuizCreate)}>
					<SimpleGrid cols={2}>
						<div className='left'>
							<TextInput
								label='Quiz Name'
								placeholder='Name of your Quiz'
								classNames={classes}
								required
								{...form.getInputProps('name')}
							/>
							<NumberInput
								defaultValue={0}
								classNames={classes}
								max={10000}
								min={0}
								required
								placeholder='price of the quiz'
								label='Price'
								{...form.getInputProps('price')}
							/>

							<Select
								label='Question Timer Type'
								placeholder='Select How Count Time'
								classNames={classes}
								data={[
									{ value: 'question', label: 'Per Question' },
									{ value: 'full', label: 'Whole Quiz' },
								]}
								{...form.getInputProps('countDownType')}
							/>
						</div>
						<div className='right'>
							<Select
								label='Status of the Quiz'
								placeholder='Pick one'
								classNames={classes}
								required
								data={[
									{ value: 'paid', label: 'Paid' },
									{ value: 'free', label: 'Free' },
								]}
								{...form.getInputProps('status')}
							/>
							<NumberInput
								defaultValue={0}
								classNames={classes}
								max={10}
								min={0}
								required
								placeholder='Number of retake for this quiz'
								label='Retakes'
								withAsterisk
								{...form.getInputProps('retake')}
							/>
							<NumberInput
								defaultValue={0}
								classNames={classes}
								max={1000}
								min={0}
								required
								placeholder='total or per quiz time in minute'
								label='Time'
								{...form.getInputProps('time')}
							/>
						</div>
					</SimpleGrid>
					<Select
						label='When to show answer?'
						placeholder='Select When to show answer'
						classNames={classes}
						data={[
							{ value: 'afterQuestion', label: 'After every question' },
							{ value: 'afterSubmission', label: 'After full submission' },
							{ value: 'afterRetakes', label: 'After All The retakes' },
						]}
						{...form.getInputProps('showAnswer')}
					/>
					<TextInput
						label='Description'
						placeholder='About The Quiz'
						classNames={{
							input: classes.descriptionInput,
							label: classes.label,
						}}
						required
						{...form.getInputProps('description')}
					/>

					<Divider my='lg' label='Add Quiz Question' labelPosition='center' />
					{showQuestionsPopover}
					{questionInputs}
					<Dropzone setImage={setImage} />

					<Button
						disabled={disableAddQuiz}
						loading={loading}
						type='submit'
						mt='lg'
						fullWidth
						variant='gradient'
						gradient={{ from: 'indigo', to: 'cyan' }}
					>
						Add Quiz
					</Button>
				</form>
			</Box>
		</Container>
	);
}

export default CreateQuizzes;
