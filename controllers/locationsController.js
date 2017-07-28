const Location = require('../models/location');

exports.sendLocation = function (req, res) {
  if (req.body.location && req.headers.id) {
    const { lat, lng } = req.body.location;
    new Location({ location: [lng, lat], user: req.headers.id }).save();
    Location.find({
      location: {
        $near: [lng, lat],
        $maxDistance: 1000,
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
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
