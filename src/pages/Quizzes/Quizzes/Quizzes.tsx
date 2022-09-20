import { Carousel } from '@mantine/carousel';
import { Container, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import axiosPrivate from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import { IQuiz } from 'pages/shared/types';
import { useEffect, useState } from 'react';

import QuizCard from '../QuizCard/QuizCard';

function Quizzes() {
	const [quizzes, setQuizzes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const getQuizzes = async () => {
			const res = await axiosPrivate.get('/quizzes');
			if (res.status === 200) {
				setQuizzes(res.data);
			}
			setLoading(false);
		};
		getQuizzes();
	}, []);

	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

	const slides = quizzes?.map((item: IQuiz) => (
		<Carousel.Slide key={item._id}>
			<QuizCard item={item} />
		</Carousel.Slide>
	));

	return (
		<Container my={50}>
			{loading ? (
				<Loading />
			) : (
				<Carousel
					slideSize='33.333333%'
					breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
					slideGap='xl'
					align='start'
					slidesToScroll={mobile ? 1 : 3}
				>
					{slides}
				</Carousel>
			)}
		</Container>
	);
}

export default Quizzes;
