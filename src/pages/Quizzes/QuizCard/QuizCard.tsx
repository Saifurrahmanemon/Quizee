import {
	Badge,
	Button,
	Center,
	Container,
	Group,
	Mark,
	Modal,
	Paper,
	Text,
	Title,
} from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons';
import auth from 'config/firebase.init';
import useGetOrder from 'hooks/useGetOrder';
import { IQuiz } from 'pages/shared/types';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './QuizCard.style';

type QuizCardProps = {
	item: IQuiz;
};

function QuizCard({ item }: QuizCardProps) {
	const [opened, setOpened] = useState(false);
	const navigate = useNavigate();
	const { classes } = useStyles();
	const [user] = useAuthState(auth);
	const { order } = useGetOrder(user?.email, item._id);
	/**
	 * check if quiz is paid or not
	 * if paid then check if user paid for this quiz
	 * if not then show the please pay modal
	 */
	const handleOnClick = (id: string) => {
		if (item.status === 'paid') {
			order?.paid === true ? navigate(`/quiz/${id}`) : setOpened(true);
		}
		// quiz is free no need to validate wether user paid for this quiz or not
		if (item.status === 'free') {
			navigate(`/quiz/${id}`);
		}
	};

	const showModal = (
		<Modal
			opened={opened}
			centered
			overlayOpacity={0.55}
			size='lg'
			overlayBlur={3}
			onClose={() => setOpened(false)}
			title='Quiz Info'
		>
			<Container>
				<Text my='lg' size='lg' weight={400}>
					Sorry!! You can not play &apos;{item.name}&apos; quiz because this is a paid quiz. But the
					good news is this quiz is only <Mark>${item?.price}</Mark>.
				</Text>
				<Text weight={500}> Do you want to purchase this quiz?</Text>
				<Group position='right' mt='sm' mb='xs'>
					<Button color='red' size='md' onClick={() => setOpened(false)}>
						Cancel
					</Button>
					<Button color='indigo' size='md' onClick={() => navigate(`/payment/${item._id}`)}>
						Proceed
					</Button>
				</Group>
			</Container>
		</Modal>
	);

	return (
		<Paper
			shadow='md'
			p='xl'
			radius='md'
			sx={{
				backgroundImage: `url(${item.img})`,
			}}
			className={classes.card}
		>
			{showModal}
			<div>
				<Text className={classes.category} size='xs'>
					{item.name}
				</Text>
				<Title order={3} className={classes.title}>
					{item.description}
				</Title>
			</div>
			<div className={classes.footer}>
				<Button onClick={() => handleOnClick(item._id)} variant='white' color='dark'>
					Play Quiz
				</Button>
				<Center>
					<IconPlayerPlay size={18} stroke={1.5} color='white' />
					<Text size='md' className={classes.bodyText}>
						{item.submissions}
					</Text>
				</Center>
				<Badge size='lg' variant='gradient'>
					{item.status}
				</Badge>
			</div>
		</Paper>
	);
}

export default QuizCard;
