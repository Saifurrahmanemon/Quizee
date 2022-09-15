const whenToShowAnswer = (answer: string | undefined) => {
	switch (answer) {
		case 'afterQuestion':
			return 'Answers will be shown after Question';
		case 'afterSubmission':
			return 'Answers will be shown after Submission';
		case 'afterRetakes':
			return 'Answers will be shown after finishing all retakes';
	}
};

export default whenToShowAnswer;
