const User = require('../models/user');

exports.createUser = function (req, res) {
  if (req.body.username) {
    new User({ username: req.body.username }).save();
    res.json({ username: req.body.username });
  } else {
    res.json({ error: 'you goofed' });
  }
};

exports.getUsers = function (req, res) {
  User.find({}, 'username when -_id').sort('-when').limit(10)
  .then((results) => {
    res.json(results);
  })
  .catch(err => res.status(400).json(err));
};

exports.getUser = function (req, res) {
  User.findById(req.params.userId)
  .then(user => res.status(200).json(location))
  .catch(err => res.status(400).json(err));
};
