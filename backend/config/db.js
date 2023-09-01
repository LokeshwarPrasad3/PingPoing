
const mongoose = require('mongoose');

// import url from .env
const DB_URL = process.env.DB_URL;

// create function which cononect to db
const connectDB = async()=>{
    try {
        // Establish connection using the DB_URL with specified options
        const conn = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }

}

// export for use 
module.exports = connectDB;