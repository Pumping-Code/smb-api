import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

require('./lib/db');

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { decode } from './lib/jwt';
import routes from './routes/index';
import usersRouter from './routes/usersRouter';
import locationsRouter from './routes/locationsRouter';
import authRouter from './routes/authRouter';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

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
        console.log('decodedId.id not equal to req.headers.id');
    }

    return res.status(403);
});

app.use('/users', usersRouter);
app.use('/locations', locationsRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
