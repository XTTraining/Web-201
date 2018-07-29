const Config = {};

Config.databaseDetails = {
    dbName: 'foodapp',
    connectionName: 'mongodb://localhost:27017/',
    categoryCollection:'categories',
    restaurantCollection: 'restaurant'
};

module.exports = Config;