var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  group: String,
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model(
  'User',
  userSchema
);

module.exports = User;