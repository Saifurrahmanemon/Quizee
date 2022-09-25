import { IQuiz } from 'pages/shared/types';
import { Dispatch, SetStateAction } from 'react';

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
