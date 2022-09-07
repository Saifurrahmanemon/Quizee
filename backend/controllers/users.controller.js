const Users = require('../model/usersModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = asyncHandler(async (req, res) => {
   const users = await Users.find();
   console.log(users);
   res.send(users);
});

module.exports.postAUser = asyncHandler(async (req, res) => {
   const user = req.body;
   const email = req.params.email;
   const query = { email: email };
   const options = { upsert: true };
   const update = {
      $set: user,
   };

   // Find the document
   const result = await Users.findOneAndUpdate(query, update, options);

   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: '30d',
   });
   res.send({ result, accessToken });
});
