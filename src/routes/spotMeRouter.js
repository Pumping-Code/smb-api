import { Router } from 'express';
import { spotABro } from '../controllers/spotMeController';

const spotMeRouter = Router();

spotMeRouter.route('/').post(spotABro);

export { spotMeRouter };
