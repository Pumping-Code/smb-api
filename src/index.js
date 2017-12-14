import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import './config/env';
import { decode } from './config/jwt';
import { authRouter, locationsRouter, rootRouter, spotMeRouter, usersRouter } from './routes';

require('./config/db');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', rootRouter);

// validate JWT
app.use((req, res, next) => {
    // Skip validation for login
    if (req.originalUrl === '/auth') {
        return next();
    }
    // validate the jwt
    if (req.headers.jwt) {
        const decodedId = decode(req.headers.jwt, process.env.JWT_SECRET);
        if (decodedId.id === req.headers.id) {
            return next();
        }
        return res.status(403).send('Invalid Authorization Token');
    }
    return res.status(403).send('No Authorization Token');
});

app.use('/auth', authRouter);
app.use('/locations', locationsRouter);
app.use('/spot-me', spotMeRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
