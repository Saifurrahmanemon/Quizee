const mongoose = require('mongoose');

const quizzesScheme = mongoose.Schema({
	name: String,
	description: String,
	img: String,
	status: String,
	retake: Number,
	submissions: Number,
	countDownType: String,
	showAnswer: String,
	price: Number,
	time: Number,
	quiz: [
		{
			question: String,
			options: [
				{
					value: String,
					label: String,
				},
			],
			correct: [String],
		},
	],
});

module.exports = mongoose.model('Quizzes', quizzesScheme);
