const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  when: { type: Date, default: Date.now },
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
