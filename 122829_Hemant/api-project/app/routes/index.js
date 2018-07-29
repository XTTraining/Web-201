'use strict';
const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantcontroller');

router.get('/', RestaurantController.getData);

module.exports = router;
