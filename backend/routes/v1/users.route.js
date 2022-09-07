const express = require('express');
const usersController = require('../../controllers/users.controller');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router
   .route('/:email')

   /**
    * @desc get all the users
    * @route GET api/v1/users
    * @access private admin
    */
   .get(verifyJWT, verifyAdmin, usersController.getAllUsers)
   /**
    * @desc register new user
    * @route POST api/v1/users
    * @access public
    */
   .put(usersController.postAUser);

module.exports = router;
