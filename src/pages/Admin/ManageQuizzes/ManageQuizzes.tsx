import {
	ActionIcon,
	Button,
	Container,
	Group,
	Modal,
	Paper,
	ScrollArea,
	Table,
	Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons';
import axios from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import useQuizzes from 'hooks/useQuizzes';
import { IQuiz } from 'pages/shared/types';
import { useState } from 'react';
import { Check } from 'tabler-icons-react';
import { useStyles } from './ManageQuizzes.style';
function ManageQuizzes() {
	const { quizzes, isLoading, refetch } = useQuizzes();
	const [scrolled, setScrolled] = useState(false);
	const [quizId, setQuizId] = useState('');
	const [opened, setOpened] = useState(false);

	const { classes, cx } = useStyles();

	const handleOnQuizDelete = async () => {
		const res = await axios.delete(`quizzes/${quizId}`);
		console.log(res);
		refetch();
		showNotification({
			title: 'Delete',
			message: 'You deleted the quiz successfully',
			icon: <Check />,
		});
		setOpened(false);
	};

	const showModal = (
		<Modal
			opened={opened}
			transition='fade'
			onClose={() => setOpened(false)}
			transitionDuration={300}
			transitionTimingFunction='ease'
		>
			<Text size='xl' weight={700}>
				Are You sure you want to delete this quiz?
			</Text>
			<Group my={20} position='right'>
				<Button variant='default' onClick={() => setOpened(false)}>
					Cancel
				</Button>
				<Button color='red' onClick={handleOnQuizDelete}>
					Delete
				</Button>
			</Group>
		</Modal>
	);

	if (isLoading) return <Loading />;
	const rows = quizzes?.map((quiz: IQuiz) => (
		<tr key={quiz._id}>
			<td className={classes.td}>{quiz.name}</td>
			<td className={classes.td}>${quiz.price}</td>
			<td className={classes.td}>{quiz.status}</td>
			<td className={classes.td}>{quiz.retake}</td>
			<td className={classes.td}>{quiz.showAnswer}</td>
			<td className={classes.td}>{quiz.countDownType}</td>
			<td className={classes.td}>{quiz.submissions}</td>
			<td>
				<ActionIcon
					onClick={() => {
						setOpened(true);
						setQuizId(quiz._id);
					}}
					color='red'
				>
					<IconTrash size={16} stroke={1.5} />
				</ActionIcon>
			</td>
		</tr>
	));

	return (
		<Container my={30}>
			<Paper shadow='lg' radius='lg' p='sm' withBorder>
				<ScrollArea sx={{ height: 400 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
					<Table verticalSpacing='sm' sx={{ minWidth: 800 }}>
						<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
							<tr>
								<th>Quiz Name</th>
								<th>Price</th>
								<th>Status</th>
								<th>Retakes</th>
								<th>Show Answer</th>
								<th>Timer Type</th>
								<th>Submissions</th>
								<th></th>
							</tr>
						</thead>
						<tbody>{rows}</tbody>
					</Table>
				</ScrollArea>
			</Paper>
			{showModal}
		</Container>
	);
}

export default ManageQuizzes;
