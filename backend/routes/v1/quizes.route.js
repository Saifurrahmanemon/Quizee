const express = require('express');
const quizesController = require('../../controllers/quizes.controller');

const router = express.Router();

router.get('/', quizesController.getAllQuizes);

router.post('/', quizesController.postAQuize);

module.exports = router;
