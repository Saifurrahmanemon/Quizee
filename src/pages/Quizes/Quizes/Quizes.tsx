import { Carousel } from '@mantine/carousel';
import { Container, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import axiosPrivate from 'api/AxiosPrivate';
import Loading from 'components/Loading';
import { useEffect, useState } from 'react';
import { IQuiz } from 'types/QuizesTypes';
import QuizCard from '../QuizCard/QuizCard';

function Quizes() {
	const [quizes, setQuizes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const getQuizzes = async () => {
			const res = await axiosPrivate.get('/quizes');
			if (res.status === 200) {
				setQuizes(res.data);
			}
			setLoading(false);
		};
		getQuizzes();
	}, []);

	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

	const slides = quizes?.map((item: IQuiz) => (
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

export default Quizes;
