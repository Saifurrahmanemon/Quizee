const whenToShowAnswer = (answer: string | undefined) => {
  switch (answer) {
    case 'afterQuestion':
      return 'You can see answers per question';
    case 'afterSubmission':
      return 'Answers will be shown after Submission';
    case 'afterRetakes':
      return 'Answers will be shown after finishing all retakes';
  }
};

export default whenToShowAnswer;
