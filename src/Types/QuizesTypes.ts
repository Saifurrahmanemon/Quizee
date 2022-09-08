import { ICreateQuizes } from './CreateQuizesTypes';

export interface IQuize extends ICreateQuizes {
   question: '';
   _id: string;
   __v: string;
   options: {
      value: string;
      label: string;
   }[];
}
