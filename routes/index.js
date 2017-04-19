const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  res.json({ home: true });
});

router.get('/users', (req, res) => {
  User.find({}, 'username when -_id').sort('-when').limit(10).then((results) => {
    res.json(results);
  });
});

router.post('/users', (req, res) => {
  if (req.body.username) {
    new User({ username: req.body.username }).save();
    res.json({ username: req.body.username });
  } else {
    res.json({ error: 'you goofed' });
  }
});

module.exports = router;
