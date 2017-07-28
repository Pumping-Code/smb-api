const _ = require('lodash');
const Location = require('../models/location');

exports.sendLocation = function (req, res) {
  if (req.body.location && req.headers.id) {
    const { lat, lng } = req.body.location;
    const { id } = req.headers;
    Location.findOneAndUpdate({ user: id }, { location: [lng, lat], user: id }, { upsert: true })
    .then(() => {
      Location.find({
        location: {
          $near: [lng, lat],
          $maxDistance: 100,
        },
      })
      .then((result) => {
        _.remove(result, { user: id });
        res.json(result); // array of close bros
      })
      .catch((err) => {
        console.log('error', err);
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
  } else {
    res.json({ error: 'location and/or fbid not sent' });
  }
};

exports.getLocations = function (req, res) {
  Location.find({}, 'location user when -_id').sort('-when').limit(10)
  .then((results) => {
    res.json(results);
  })
  .catch(err => res.status(400).json(err));
};
