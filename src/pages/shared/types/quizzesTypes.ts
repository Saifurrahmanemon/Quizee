import { ICreateQuizzes } from './createQuizzesTypes';

export interface IQuiz extends ICreateQuizzes {
	correct: string[] | [];
	countDownType: string;
	question: '';
	_id: string;
	__v: string;
	options: {
		value: string;
		label: string;
	}[];
}
