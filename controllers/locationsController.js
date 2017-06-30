const Location = require('../models/location');

exports.sendLocation = function (req, res) {
  if (req.body.location) {
    new Location({ location: req.body.location }).save();
    res.json({ location: req.body.location });
  } else {
    res.json({ error: 'you goofed' });
  }
};

exports.getLocations = function (req, res) {
  Location.find({}, 'location when -_id').sort('-when').limit(10)
  .then((results) => {
    res.json(results);
  })
  .catch(err => res.status(400).json(err));
};
