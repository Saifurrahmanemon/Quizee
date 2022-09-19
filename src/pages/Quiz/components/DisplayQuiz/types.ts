import { Dispatch, SetStateAction } from 'react';
import { IQuiz } from 'types/QuizzesTypes';

export type DisplayQuizProps = {
	renderQuestion: IQuiz;
	checkedValues: string[];
	setCheckedValues: Dispatch<SetStateAction<string[]>>;
	isSelected: boolean;
	handleNextQuiz: () => void;
	isCheckboxDisabled: boolean;
	handleShowAnswer: () => void;
	showAnswerPerQuestion: boolean;
};
