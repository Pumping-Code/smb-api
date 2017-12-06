import { Router } from 'express';
import { login } from '../controllers/authController';

const authRouter = Router();

authRouter.route('/').post(login);

export { authRouter };
