/* eslint-disable no-param-reassign */
const express = require('express');
const City = require('../models/cityModel');

const router = () => {
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
  cityRouter
    .route('/cities/:id')
    .get((req, res) => {
      City.findById(req.params.id, (err, city) => {
        if (err) return res.send(err);
        return res.json(city);
      });
    })
    .put((req, res) => {
      City.findById(req.params.id, (err, city) => {
        if (err) return res.send(err);
        city.city = req.body.city;
        city.growth_from_2000_to_2013 = req.body.growth_from_2000_to_2013;
        city.latitude = req.body.latitude;
        city.logitude = req.body.longitude;
        city.population = req.body.population;
        city.rank = req.body.rank;
        city.state = req.body.state;
        city.save();
        return res.json(city);
      });
    });

  return cityRouter;
};
// find all books based on state

module.exports = router;
