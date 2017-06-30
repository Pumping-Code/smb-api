const express = require('express');

const router = express.Router();
const users = require('../controllers/usersController');

router.route('/').post(users.createUser);

router.route('/').get(users.getUsers);

router.route('/:userId').get(users.getUser);

module.exports = router;
