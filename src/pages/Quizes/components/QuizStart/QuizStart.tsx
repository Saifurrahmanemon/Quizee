import { Button, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';

type QuizStartProps = {
	toShowAnswer: string | undefined;
	handleQuizStart: () => void;
	retakes: number | undefined;
};

function QuizStart({ toShowAnswer, handleQuizStart, retakes: remainingRetakes }: QuizStartProps) {

	return (
		<>
			<Paper my={20} radius='md' p='md' withBorder>
				<SimpleGrid cols={1}>
					<Group position='apart'>
						<Title order={4}>{toShowAnswer}</Title>
						<Text>Retakes Left: {remainingRetakes}</Text>
					</Group>
					<Stack my={30} align='center'>
						<Text weight={500}> Play Start Button When You Are Ready</Text>
						<Button variant='outline' px={30} onClick={handleQuizStart} mx={30}>
							Start
						</Button>
					</Stack>
				</SimpleGrid>
			</Paper>
		</>
	);
}

export default QuizStart;
