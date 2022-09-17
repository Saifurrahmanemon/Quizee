import { Button, Group, Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { CompareAnswerType } from '../../../Quiz/Quiz';

type ShowAnswersProps = {
	allQuestionAnswers: CompareAnswerType[] | [];
};

function ShowAnswers({ allQuestionAnswers }: ShowAnswersProps) {
	const navigate = useNavigate();
	const tableHeads = (
		<tr>
			<th>No:</th>
			<th>Question</th>
			<th>Your Answer</th>
			<th>Correct Answer</th>
			<th>Points</th>
		</tr>
	);

	const rows = allQuestionAnswers.map((element, idx) => (
		<tr key={element.question}>
			<td>{idx + 1}</td>
			<td>{element.question}</td>
			<td>
				{element.userAnswers?.map((answer) => (
					<span key={answer}>{answer}, </span>
				))}
			</td>
			<td>
				{element.correctAnswer?.map((answer) => (
					<span key={answer}>{answer}, </span>
				))}
			</td>
			<td>{element.point}</td>
		</tr>
	));
	return (
		<>
			<Table
				striped
				highlightOnHover
				horizontalSpacing='md'
				verticalSpacing='md'
				captionSide='top'
				my={20}
			>
				<caption>Information about the quiz</caption>
				<thead>{tableHeads}</thead>
				<tbody>{rows}</tbody>
			</Table>
			<Group my={10} position='center'>
				<Button onClick={() => navigate('/quizes')}>Go Back to Quizzes</Button>
			</Group>
		</>
	);
}

export default ShowAnswers;
