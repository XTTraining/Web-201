const Config = require('../../config');
const Connection = require('../database/connection');

const restaurantData = require('../models/restaurant');
var RestaurantController = {};

RestaurantController.getData = (req, res) =>{
    const db = Connection.connect(Config.databaseDetails.dbName);
    if(db!==""){
        restaurantData.find( (err, restaurantInfo) =>{
            if(err){
                return console.error('Error occured while fetching Restaurant Data from Mongo');
            }
            console.log(restaurantInfo);
            res.send(restaurantInfo);
        });
    }
};

module.exports = RestaurantController;


