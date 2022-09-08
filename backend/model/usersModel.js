const mongoose = require('mongoose');

const usersScheme = mongoose.Schema(
   {
      name: String,
      email: String,
      role: Boolean,
   },
   {
      timestamps: true,
   },
);

module.exports = mongoose.model('Users', usersScheme);
