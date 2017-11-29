import express from 'express';

const router = express.Router();
const locations = require('../controllers/locationsController');

router.use((req, res, next) => {
    const { token } = req.headers;
    console.log('token', token);
    next();
});

router.route('/').post(locations.sendLocation);

router.route('/').get(locations.getLocations);

module.exports = router;
