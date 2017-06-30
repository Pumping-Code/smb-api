if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./config/db');

const routes = require('./routes/index');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
