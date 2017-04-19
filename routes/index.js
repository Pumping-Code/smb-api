const express = require('express');

const router = express.Router();

const Users = require('../models/users');

router.get('/', (req, res) => {
  res.json({ home: true });
});

router.get('/users', (req, res) => {
  Users.find({}, 'username when -_id').sort('-when').limit(10).then((results) => {
    res.json(results);
  });
});

router.post('/users', (req, res) => {
  console.log(req);
  // new History({ term: req.params.q }).save();
  res.json(req);
});

module.exports = router;
