const asyncHandler = require('express-async-handler');
const Quizzes = require('../model/quizzesModel');

module.exports.getAllQuizzes = asyncHandler(async (req, res) => {
	const quizzes = await Quizzes.find();
	res.send(quizzes);
});

module.exports.postAQuiz = asyncHandler(async (req, res) => {
	const body = req.body;
	const result = await Quizzes.create(body);
	res.status(200).json(result);
});

module.exports.getAQuiz = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const result = await Quizzes.findById(id);
	res.status(200).json(result);
});

module.exports.updateAQuiz = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const body = req.body;
	const updateDoc = {
		$set: body,
	};
	const result = await Quizzes.findByIdAndUpdate(id, updateDoc);
	res.status(200).json(result);
});

module.exports.deleteAQuiz = asyncHandler(async (req, res) => {
	res.send('delete a quiz');
});
