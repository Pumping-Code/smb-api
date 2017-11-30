import express from 'express';
import { createUser, getUsers, getUser } from '../controllers/usersController';

const router = express.Router();

router.route('/').post(createUser);

router.route('/').get(getUsers);

router.route('/:userId').get(getUser);

module.exports = router;
