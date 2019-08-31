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
const cityRouter = express.Router();
const City = require('./models/cityModel');

cityRouter.route('/cities').get((req, res) => {
  const query = {};
  if (req.query.rank) {
    query.rank = req.query.rank;
  }
  City.find(query, (err, cities) => {
    if (err) return res.send(err);
    return res.json(cities);
  });
});
app.use(morgan('dev'));
app.use('/api', cityRouter);
app.get('/', (req, res) => {
  res.send('this is my index page');
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
