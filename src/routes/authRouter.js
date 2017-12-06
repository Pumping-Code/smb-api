import { Router } from 'express';
import { login } from '../controllers/authController';

const authRouter = Router();

// POST to /auth
authRouter.route('/').post(login);

export { authRouter };
