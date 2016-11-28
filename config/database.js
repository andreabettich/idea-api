'use strict';

// Dependencies
const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

const db = Mongoose.connection;

console.log("Database Init");
if (process.env.MONGO_HOST && process.env.MONGO_PORT && process.env.MONGO_DB_NAME) {
    let mongoConnectionString = "mongodb://";
    if (process.env.MONGO_DB_USER && process.env.MONGO_DB_PASSWORD) {
        mongoConnectionString = mongoConnectionString.concat(process.env.MONGO_DB_USER + ":" + process.env.MONGO_DB_PASSWORD + "@");
    }
    mongoConnectionString = mongoConnectionString.concat(process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB_NAME);
    console.log(mongoConnectionString);
    Mongoose.connect(mongoConnectionString);

    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('open', () => {
        console.log('Connection with database succeeded');
    });
} else {
    console.log("No MongoDB Connection info defined");
}

module.exports = db;
