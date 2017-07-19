const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  location: {
    lat: Number,
    lng: Number,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  when: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
