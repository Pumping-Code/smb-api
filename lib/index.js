if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const db = require('../config/db');
const jwt = require('../lib/jwt.js');

import routes from '../routes/index';
import usersRouter from '../routes/usersRouter';
import locationsRouter from '../routes/locationsRouter';
import authRouter from '../routes/authRouter';

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
        const decodedId = jwt.decode(req.headers.jwt);
        if (decodedId === req.headers.id) {
            return next();
        }
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
