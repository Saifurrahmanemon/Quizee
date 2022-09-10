import { ICreateQuizes } from './CreateQuizesTypes';

export interface IQuize extends ICreateQuizes {
   correct: string[] | [];
   question: '';
   _id: string;
   __v: string;
   options: {
      value: string;
      label: string;
   }[];
}
