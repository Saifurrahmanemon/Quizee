const express = require('express');
const quizesController = require('../../controllers/quizes.controller');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

/**
 * @desc users can get all  quizes to play
 * @route GET api/v1/quizes
 * @access private users
 */

router.get('/', verifyJWT, quizesController.getAllQuizes);

/**
 * @desc only admin can create a quiz
 * @route POST api/v1/quizes
 * @access private admin
 */

router.post('/:email', verifyAdmin, quizesController.postAQuize);

/**
 * @desc single quiz
 * @route get api/v1/quizes
 * @access private users
 */

router.get('/:id', verifyJWT, quizesController.getAQuiz);

module.exports = router;
