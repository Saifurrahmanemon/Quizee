import { ICreateQuizzes } from './createQuizzesTypes';

export interface IQuiz extends ICreateQuizzes {
	correct: string[] | [];
	countDownType: 'question' | 'full';
	submissions: number;
	question: '';
	_id: string;
	__v: string;
	options: {
		value: string;
		label: string;
		_id: string;
	}[];
}
