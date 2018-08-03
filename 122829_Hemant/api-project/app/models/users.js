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

const UsersSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    orders:{
        type: [menuItem]
    }
}, {collection: "users"});

module.exports = Users = mongoose.model('users', UsersSchema);