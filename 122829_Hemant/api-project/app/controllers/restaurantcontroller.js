const mongoose = require('mongoose');
const Config = require('../../config');
const Connection = require('../database/connection');

require('../models/restaurant');
const restaurantData = mongoose.model('restaurantData');

var RestaurantController = {};

RestaurantController.getData = function(req, res, next){
    const db = Connection.connect(Config.databaseDetails.dbName);
    if(db!==""){
        restaurantData.find(function (err, restaurantInfo){
            if(err){
                return console.error('Error occured while fetching Restaurant Data from Mongo');
            }
            console.log(restaurantInfo);
            res.send(restaurantInfo);
        });
    }
};

module.exports = RestaurantController;


