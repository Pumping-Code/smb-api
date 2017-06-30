const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  when: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
