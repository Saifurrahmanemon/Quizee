import { Button, Container, Text, Title } from '@mantine/core';
import { useStyles } from './Banner.styles';
import { Dots } from './Dots';

function Banner() {
  const { classes } = useStyles();

  const showDots = (
    <>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 500, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 180 }} />
    </>
  );

  return (
    <Container className={classes.wrapper}>
      {showDots}
      <div className={classes.inner}>
        <Title data-cy='home-title' className={classes.title}>
          Free and{' '}
          <Text component='span' className={classes.highlight} inherit>
            Open Source
          </Text>{' '}
          Quiz Game
        </Title>

        <Container p={0} size={600}>
          <Text size='lg' color='dimmed' className={classes.description}>
            Quizee is a free and open-source quiz application that lets you play fully customized
            quizzes right in the browser.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            component='a'
            href='https://github.com/Saifurrahmanemon/Quizee'
            target='_blank'
            className={classes.control}
            size='lg'
            variant='default'
            color='gray'
            data-cy='open-source-code'
          >
            Source Code
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Banner;
