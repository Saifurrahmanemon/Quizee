import { Carousel } from '@mantine/carousel';
import { Container, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Loading from 'components/Loading';
import useQuizzes from 'hooks/useQuizzes';
import { IQuiz } from 'pages/shared/types';

import QuizCard from '../QuizCard/QuizCard';

function Quizzes() {
  const { quizzes, isLoading } = useQuizzes();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const slides = quizzes?.map((item: IQuiz) => (
    <Carousel.Slide key={item._id}>
      <QuizCard item={item} />
    </Carousel.Slide>
  ));

  return (
    <Container my={50}>
      {isLoading ? (
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
