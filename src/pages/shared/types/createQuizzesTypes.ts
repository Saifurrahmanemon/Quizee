export type QuizType = {
	question: string;
	options: {
		value: string;
		label: string;
	}[];
	correct: string[];
};

export interface ICreateQuizzes {
	submissions: number;
	name: string;
	description: string;
	img: string;
	status: string;
	price?: number;
	retake: number;
	countDownType?: 'question' | 'full';
	showAnswer: 'afterQuestion' | 'afterSubmission' | 'afterRetakes';
	time: number;
	quiz: QuizType[];
}
