const mongoose = require('mongoose');
const Config = require('../../config');

const Connection = {};

Connection.connect = function (dbName) {
    let connectionName = Config.databaseDetails.connectionName;
    if (dbName != undefined && dbName != null) {
        connectionName = connectionName + dbName;
    }

    mongoose.connect(connectionName);
    if (mongoose.connection.readyState) {
        console.log('connection Successfully');
        return mongoose.connection;
    } else {
        console.log('connection unsuccessfull... please check settings');
        return "";
    }
};

module.exports = Connection;