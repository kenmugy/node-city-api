const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();
// open database connection
const db = mongoose.connect('mongodb://localhost/cityAPI', {
  useNewUrlParser: true,
  useCreateIndex: true
});
const port = process.env.PORT || 8000;
const City = require('./models/cityModel');
const cityRouter = require('./routes/cityRouter')(City);

app.use(express.urlencoded({ extended: true })); // also needed to enable express get info from body
app.use(express.json()); // for handling jsondata from the body
app.use(morgan('dev'));
app.use('/api', cityRouter);
app.get('/', (req, res) => {
  res.send('this is my index page');
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
