const express = require('express');
// const City = require('../models/cityModel');

const router = City => {
  const cityRouter = express.Router();

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
      city.save();
      res.status(201).json(city);
    });

  // find one book by id
  cityRouter.route('/cities/:id').get((req, res) => {
    City.findById(req.params.id, (err, city) => {
      if (err) return res.send(err);
      return res.json(city);
    });
  });

  return cityRouter;
};
// find all books based on state

module.exports = router;
