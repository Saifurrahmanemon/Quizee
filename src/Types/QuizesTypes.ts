import { ICreateQuizes } from './CreateQuizesTypes';

export interface IQuiz extends ICreateQuizes {
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
