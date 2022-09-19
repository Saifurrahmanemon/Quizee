import { Badge, Button, Paper, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IQuiz } from 'types/QuizzesTypes';
import { useStyles } from './QuizCard.style';

type QuizCardProps = {
	item: IQuiz;
};

function QuizCard({ item }: QuizCardProps) {
	const navigate = useNavigate();
	const { classes } = useStyles();
	/**
	 * check if quiz is paid or not
	 * if paid then check if user paid for this quiz
	 * if not then show the please pay modal
	 */
	const handleOnClick = (id: string) => {
		if (item.status === 'paid') {
			console.log('you need to pay for this quiz');
		} else if (item.status === 'free') {
			navigate(`/quiz/${id}`);
		}
	};

	return (
		<Paper
			shadow='md'
			p='xl'
			radius='md'
			sx={{ backgroundImage: `url(${item.img})` }}
			className={classes.card}
		>
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
				<Badge size='lg' variant='gradient'>
					{item.status}
				</Badge>
			</div>
		</Paper>
	);
}

export default QuizCard;
