type QuizType = {
   question: string;
   options: string[];
   correct: number | number[];
};

export interface ICreateQuizes {
   name: string;
   description: string;
   img: string;
   status: string;
   retake: number;
   countDownType: string;
   showAnswer: string;
   quize: [QuizType];
}
