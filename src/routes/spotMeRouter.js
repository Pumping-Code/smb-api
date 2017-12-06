import { Router } from 'express';
import { spotABro } from '../controllers/spotMeController';

const spotMeRouter = Router();

// POST to /spot-me
spotMeRouter.route('/').post(spotABro);

export { spotMeRouter };
