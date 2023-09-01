
const express = require('express');
// dotenv give .env access need config
const dotenv = require('dotenv');
dotenv.config();
// getting port no from env file
const PORT = process.env.PORT || 5000;
// getting db connection
const connectDB = require("./config/db");
// require some data of chats
const chats = require('./data/data.js');
// all the user authentication routes here
const userRoutes = require('./routes/userRoutes');
// if user access unExisted path then show that 
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// connect to db call
connectDB();
// make instance of express variable
const app = express();
// we getting json values from frontend so need to tell server to accept that json data
app.use(express.json()); // to accept json data


// make first server
app.get('/', (req, res) => {
    res.send("API IS RUNNING"); 
})


//👉 app.use() general purpose routing method in Express. using for add middleware functions 
//👉 app.use() is often used for middleware functions authentication middleware 
// for routing that applies to multiple HTTP methods(GET, POST, PUT, DELETE, etc.).
// When you use app.use() the middleware or route handler specified will be executed for any HTTP method and any request path that matches the provided path prefix.

// add middleware if two parameter then (path, functionName) 
app.use('/api/user', userRoutes);

//👉 add error handling middleware if one parameter (functionNameOnly)
// It's usually placed at the end of your route handlers to catch any unmatched requests.

//👉 This middleware is often used to handle requests for routes that do not match any of the defined routes in your application. 
app.use(notFound);

//👉 if anyone cannot handled error then It helps centralize error handling in your application.
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is started on PORT : ${PORT}`);
})
