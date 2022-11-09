const mongoose = require('mongoose');

const user = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  }
},{timestamps:true})

const User = mongoose.model('users', user);
module.exports = User