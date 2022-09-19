const asyncHandler = require('express-async-handler');
const Quizes = require('../model/quizesModel');

module.exports.getAllQuizes = asyncHandler(async (req, res) => {
	const quizes = await Quizes.find();
	res.send(quizes);
});

module.exports.postAQuize = asyncHandler(async (req, res) => {
	const body = req.body;
	const result = await Quizes.create(body);
	res.status(200).json(result);
});

module.exports.getAQuiz = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const result = await Quizes.findById(id);
	res.status(200).json(result);
});
