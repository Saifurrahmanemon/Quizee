const Users = require('../model/usersModel');
const asyncHandler = require('express-async-handler');

const verifyAdmin = asyncHandler(async (req, res, next) => {
  const requester = req.decoded.email;
  console.log(requester);

  const account = await Users.findOne({
    email: requester,
  });
  if (account.role) {
    next();
  } else {
    res.status(403).send({ message: 'forbidden access ⚠️' });
  }
});

module.exports = verifyAdmin;
