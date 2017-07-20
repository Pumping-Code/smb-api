const User = require('../models/user');

exports.createUser = function (req, res) {
  User.find({ fbid: req.body.id })
    .then((result) => {
      if (result.length) {
        // already exists in DB
        res.status(200).json(result);
      } else {
        // create new user
        new User({ username: req.body.name, fbid: req.body.id }).save();
        res.status(201).json({ username: req.body.name });
      }
    })
    .catch(err => res.status(400).json(err));
};

exports.getUsers = function (req, res) {
  User.find({}).limit(10)
  .then((results) => {
    res.json(results);
  })
  .catch(err => res.status(400).json(err));
};

exports.getUser = function (req, res) {
  User.find({ id: req.params.userId })
  .then(user => res.status(200).json(user))
  .catch(err => res.status(400).json(err));
};
