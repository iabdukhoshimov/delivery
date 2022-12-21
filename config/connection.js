require('dotenv').config()

const cfg = require('./index')
const mongoose = require('mongoose')
const logger = require('./logger')
// let mongoDBUrl =
//     "mongodb://" +
//     cfg.mongoUser +
//     ":" +
//     cfg.mongoPassword +
//     "@" +
//     cfg.mongoHost +
//     ":" +
//     cfg.mongoPort +
//     "/" +
//     cfg.mongoDatabase;
let mongoDBUrl = "mongodb://localhost:27017/plan_barbosa_node_tg_bot"
mongoose.connect(
    mongoDBUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    },
    (err) => {
        if (err) {
            console.log("Error while connecting to database (" + 
            mongoDBUrl + ") "+ err.message);
            logger.error("Error while connecting to database (" + 
            mongoDBUrl + ") "+ err.message);
        }
    }
);

mongoose.connection.once("open", function () {
    console.log("Connected to database");
    logger.info("Connected to the databasee");
});

