export type QuizType = {
	question: string;
	options: {
		value: string;
		label: string;
	}[];
	correct: string[];
};

export interface ICreateQuizes {
	name: string;
	description: string;
	img: string;
	status: string;
	price?: number;
	retake: number;
	countDownType: string;
	showAnswer: string;
	time: number;
	quiz: QuizType[];
}
