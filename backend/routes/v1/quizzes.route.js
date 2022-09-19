const express = require('express');
const quizzesController = require('../../controllers/quizzes.controller');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

/**
 * @desc users can get all  quizzes to play
 * @route GET api/v1/quizzes
 * @access private users
 */

router.get('/', verifyJWT, quizzesController.getAllQuizzes);

/**
 * @desc only admin can create a quiz
 * @route POST api/v1/quizzes
 * @access private admin
 */

router.post('/:email', verifyAdmin, quizzesController.postAQuiz);

/**
 * @desc single quiz
 * @route get api/v1/quizzes
 * @access private users
 */

router.get('/:id', verifyJWT, quizzesController.getAQuiz);

module.exports = router;
