import { Button, Checkbox, Divider, Group, Paper, Text } from '@mantine/core';
import { DisplayQuizProps } from './types';

function DisplayQuiz({
	renderQuestion,
	checkedValues,
	setCheckedValues,
	isSelected,
	handleNextQuiz,
	isCheckboxDisabled,
	handleShowAnswer,
	showAnswerPerQuestion,
}: DisplayQuizProps) {
	/*
	 * this is for showing answer based on per question
	 * show answer button will be only appear if the answer type is afterQuestion.
	 * if isCheckboxDisabled true, that means user already clicked the show answer button
	 * else render normal option.label
	 */

	const answers = renderQuestion?.correct as string[];

	const displayOptions = renderQuestion?.options.map((option, idx) => {
		const showLabels = isCheckboxDisabled ? (
			answers.indexOf(option.value) === -1 ? (
				<Text color='red' strikethrough>
					{option.label}
				</Text>
			) : (
				<Text color='green' weight={500}>
					{option.label}
				</Text>
			)
		) : (
			option.label
		);

		return (
			<>
				<Checkbox
					my='md'
					disabled={isCheckboxDisabled}
					mr={10}
					key={`${option.value}_${idx}`}
					label={showLabels}
					value={option.value}
				>
					{option.label}
				</Checkbox>
			</>
		);
	});

	return (
		<>
			<Paper my={20} radius='md' p='md' withBorder>
				<Text> {renderQuestion?.question}</Text>
			</Paper>
			<Text size='sm' color='gray' my={20}>
				Please chose your answer:
			</Text>
			<Checkbox.Group value={checkedValues} onChange={setCheckedValues}>
				{displayOptions}
			</Checkbox.Group>
			<Divider my='sm' />
			<Group position='apart'>
				{showAnswerPerQuestion && (
					<Button onClick={handleShowAnswer} disabled={isSelected} variant='subtle' compact>
						Show Answer
					</Button>
				)}
				<Button disabled={isSelected} onClick={handleNextQuiz} variant='gradient' px={20}>
					Next
				</Button>
			</Group>
		</>
	);
}

export default DisplayQuiz;
