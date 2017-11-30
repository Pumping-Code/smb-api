import express from 'express';
import { sendLocation, getLocations } from '../controllers/locationsController';

const router = express.Router();

router.use((req, res, next) => {
    const { token } = req.headers;
    console.log('token', token);
    next();
});

router.route('/').post(sendLocation);

router.route('/').get(getLocations);

module.exports = router;
