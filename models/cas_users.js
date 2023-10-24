const mongoose = require('../config/config.js');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name:String,
  password: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("cas_users", userSchema);
