const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const connectDB = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options);
        console.log('connection to DB is successful');

        mongoose.connection.on('error', (error) => {
            console.error('DB connection error');
        })
    } catch (error) {
        console.error('Could not connect to DB ', error.toString());
    }
}

module.exports = connectDB;