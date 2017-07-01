if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const db = require('./config/db');

const routes = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const locationsRouter = require('./routes/locationsRouter');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/users', usersRouter);
app.use('/locations', locationsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
