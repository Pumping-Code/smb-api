import { Router } from 'express';
import { createUser, getUsers, getUser } from '../controllers/usersController';

const usersRouter = Router();

// POST to /users
usersRouter.route('/').post(createUser);

// GET to /users
usersRouter.route('/').get(getUsers);

// GET to /users/:userId
usersRouter.route('/:userId').get(getUser);

export { usersRouter };
