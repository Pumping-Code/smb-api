import { Router } from 'express';
import { sendLocation, getLocations } from '../controllers/locationsController';

const locationsRouter = Router();

locationsRouter.use((req, res, next) => {
    const { token } = req.headers;
    console.log('token', token);
    next();
});

locationsRouter.route('/').post(sendLocation);

locationsRouter.route('/').get(getLocations);

export { locationsRouter };
