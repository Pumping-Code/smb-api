const Location = require('../models/location');

exports.sendLocation = function (req, res) {
  if (req.body.location && req.headers.auth) {
    new Location({ location: req.body.location, user: req.headers.auth }).save();
    res.json({ location: req.body.location });
  } else {
    res.json({ error: 'you goofed' });
  }
};

exports.getLocations = function (req, res) {
  Location.find().populate('fbid')
  .then((results) => {
    res.json(results);
  })
  .catch(err => res.status(400).json(err));
};
