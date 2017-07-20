const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number,
  },
  user: String,
  when: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
