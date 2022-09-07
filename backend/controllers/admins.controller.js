const Users = require('../model/usersModel');
const asyncHandler = require('express-async-handler');

module.exports.makeAnAdmin = asyncHandler(async (req, res) => {
   const email = req.params.email;
   const filter = { email: email };
   const updateDoc = {
      $set: { role: 'admin' },
   };
   const result = await Users.updateOne(filter, updateDoc);
   res.send(result);
});

module.exports.getAnAdmin = asyncHandler(async (req, res) => {
   const email = req.params.email;
   const user = await Users.findOne({ email: email });
   const isAdmin = user.role === 'admin';
   res.send({ admin: isAdmin });
});
