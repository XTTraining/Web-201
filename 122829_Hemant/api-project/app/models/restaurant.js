const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItem = new Schema({
    name:String,
    gst: Number,
    category: String,
    cuisine: String,
    description: String,
    subcategory: String,
    image: String,
    price:{
        amount: String,
        currency: String
    },
    quantity:{
        numericValue: Number,
        unit: String
    },
    maxQuantity:Number,
    available: Boolean
});

const restaurantData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coupon: String,
    restaurantid: Number,
    name: String,
    ratings: Number,
    address: String,
    image: String,
    delieveryTime: String,
    offers:{
        discount:String
    },
    menu:[menuItem]
}, {collection: "restaurant"});

mongoose.model('restaurantData', restaurantData);

