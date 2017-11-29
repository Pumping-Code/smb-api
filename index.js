if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/db');
const jwt = require('./lib/jwt.js');

const routes = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const locationsRouter = require('./routes/locationsRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use('/', routes);
app.use('/users', usersRouter);
app.use('/locations', locationsRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
