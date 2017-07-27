const Location = require('../models/location');

exports.sendLocation = function (req, res) {
  if (req.body.location && req.headers.id) {
    new Location({ location: req.body.location, user: req.headers.id }).save();
    res.json({ location: req.body.location });
  } else {
    res.json({ error: 'you goofed' });
  }
};

exports.getLocations = function (req, res) {
  Location.find({}, 'location user when -_id').sort('-when').limit(10)
  .then((results) => {
    res.json(results);
  })
  .catch(err => res.status(400).json(err));
};
