import { Router } from 'express';
import { createUser, getUsers, getUser } from '../controllers/usersController';

const usersRouter = Router();

usersRouter.route('/').post(createUser);

usersRouter.route('/').get(getUsers);

usersRouter.route('/:userId').get(getUser);

export { usersRouter };
