const express = require('express');
const usersController = require('../../controllers/users.controller');

const router = express.Router();

/**
 * @desc get all the users
 * @route GET api/v1/users
 * @access admin
 */
router.get('/', usersController.getAllUsers);
/**
 * @desc register new user
 * @route POST api/v1/users
 * @access public
 */
router.put('/:email', usersController.postAUser);

module.exports = router;
