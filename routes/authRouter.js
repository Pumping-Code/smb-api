import express from 'express';

const router = express.Router();
const auth = require('../controllers/authController');

router.route('/').post(auth.login);

module.exports = router;
