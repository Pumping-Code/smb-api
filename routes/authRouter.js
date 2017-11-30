import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.route('/').post(login);

module.exports = router;
