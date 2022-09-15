import { Badge, Button, Paper, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IQuiz } from '../../../types/QuizesTypes';

import { useStyles } from './QuizCard.style';

type QuizCardProps = {
	item: IQuiz;
};

function QuizCard({ item }: QuizCardProps) {
	const navigate = useNavigate();
	const { classes } = useStyles();

	const handleOnClick = (id: string) => {
		console.log(id);
		navigate(`/quiz/${id}`);
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
