import { Button, Group, Highlight, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';

type FinishRetakesProps = {
	showAnswer: string | undefined;
	retakes: number | undefined;
	handleShowResults: () => void;
};

/**
 * Highlight component from mantine does not takes multiple object as child so we had to declare message string separately
 */
function FinishRetakes({ showAnswer, retakes, handleShowResults }: FinishRetakesProps) {
	const answer = showAnswer !== undefined ? showAnswer : '';

	const retakesWarning = 'you will lose all of your retakes';
	const message = `We really appreciate you took the time and effort to participate in this quiz. As we
  said before ${answer}, We cannot show answers right now. If you want to see the answers
  you can click the Show Result button. But keep in mind that ${retakesWarning} means you can not participate in this quiz ever.`;
	return (
		<>
			<Paper my={20} radius='md' p='md' withBorder>
				<SimpleGrid cols={1}>
					<Group position='apart'>
						<Title order={4}>Thanks for participating in the quiz.</Title>
						<Text weight={500}>Retakes Left: {retakes} </Text>
					</Group>
					<Stack my={30} align='center'>
						<Highlight
							align='center'
							component='span'
							mx={20}
							highlight={[retakesWarning, answer]}
							highlightStyles={(theme) => ({
								backgroundImage: theme.fn.linearGradient(
									45,
									theme.colors.orange[5],
									theme.colors.red[5]
								),
								fontWeight: 700,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
							})}
						>
							{message}
						</Highlight>
						<Group>
							<Button onClick={handleShowResults} variant='outline' color='red' px={30} mx={30}>
								Show Result
							</Button>
							<Button>Go to Quizzes</Button>
						</Group>
					</Stack>
				</SimpleGrid>
			</Paper>
		</>
	);
}

export default FinishRetakes;
