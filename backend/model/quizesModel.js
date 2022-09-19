const mongoose = require('mongoose');

const quizesScheme = mongoose.Schema({
	name: String,
	description: String,
	img: String,
	status: String,
	retake: Number,
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

module.exports = mongoose.model('Quizes', quizesScheme);
