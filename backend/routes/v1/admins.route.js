const express = require('express');
const adminsController = require('../../controllers/admins.controller');
const router = express.Router();

router
   .route('/:email')
   /**
    * @desc make a user admin
    * @route PUT api/v1/admins
    * @access admin
    */
   .put(adminsController.makeAnAdmin)
   /**
    * @desc check if user is a admin
    * @route get api/v1/admins
    * @access public
    */
   .get(adminsController.getAnAdmin);

module.exports = router;
