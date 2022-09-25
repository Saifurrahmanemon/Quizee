import { IQuiz } from 'pages/shared/types';

export function getTotalSubmissions(quizzes: IQuiz[] | [] = []) {
  let totalSubmissions = 0;
  for (const quiz of quizzes) {
    if (quiz?.submissions !== undefined) {
      totalSubmissions += quiz?.submissions;
    }
  }
  return { totalSubmissions };
}
