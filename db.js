require('dotenv').config();
const { MongoClient } = require('mongodb');
    

let db;
let connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?appName=${process.env.MONGO_APP_NAME}`;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(connectionString)
        .then((client) => {
            db = client.db();
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
    },
    getDb: () => db
};

