const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: String,
  fbid: { type: Schema.Types.ObjectId, ref: 'Location' },
  when: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
