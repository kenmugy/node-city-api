const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));

const cityRouter = express.Router();

cityRouter.route('/').get((req, res) => {
  res.send('this is my city router');
});

app.use('/api', cityRouter);
app.get('/', (req, res) => {
  res.send('this is my index page');
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
