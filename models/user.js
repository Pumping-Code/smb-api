const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  when: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
