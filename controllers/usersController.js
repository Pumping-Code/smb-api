const User = require('../models/user');

exports.createUser = function (req, res) {
    User.find({ id: req.body.id })
    .then((result) => {
        if (result.length) {
        // already exists in DB
            if (req.body.pushToken) {
                User.findOneAndUpdate({ id: req.body.id }, { username: req.body.name, pushToken: req.body.pushToken }, { upsert: true })
          .then(() => {
              res.status(200).json(result);
          });
            } else {
                res.status(200).json(result);
            }
        } else {
        // create new user
            new User({ username: req.body.name, id: req.body.id, pushToken: req.body.pushToken }).save();
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
