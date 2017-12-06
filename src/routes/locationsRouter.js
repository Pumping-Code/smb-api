import { Router } from 'express';
import { sendLocation, getLocations } from '../controllers/locationsController';

const locationsRouter = Router();

// POST to /locations
locationsRouter.route('/').post(sendLocation);

// GET to /locations
locationsRouter.route('/').get(getLocations);

export { locationsRouter };
