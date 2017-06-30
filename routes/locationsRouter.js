const express = require('express');

const router = express.Router();
const locations = require('../controllers/locationsController');

router.route('/').post(locations.sendLocation);

router.route('/').get(locations.getLocations);

module.exports = router;
