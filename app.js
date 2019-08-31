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
// find all books based on state
cityRouter
  .route('/cities')
  .get((req, res) => {
    const query = {};
    if (req.query.state) {
      query.state = req.query.state;
    }
    City.find(query, (err, cities) => {
      if (err) return res.send(err);
      return res.json(cities);
    });
  })
  .post((req, res) => {
    const city = new City(req.body);
    res.json(city);
  });

// find one book by id
cityRouter.route('/cities/:id').get((req, res) => {
  City.findById(req.params.id, (err, city) => {
    if (err) return res.send(err);
    return res.json(city);
  });
});

app.use(express.urlencoded({ extended: true })); // also needed to enable express get info from body
app.use(express.json()); // for handling jsondata from the body
app.use(morgan('dev'));
app.use('/api', cityRouter);
app.get('/', (req, res) => {
  res.send('this is my index page');
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
