
const express = require('express');
// dotenv give .env access need config
const dotenv = require('dotenv');
dotenv.config();
// getting port no from env file
const PORT = process.env.PORT || 5000;
const cors = require('cors');
// getting db connection
const connectDB = require("./config/db");
// require some data of chats
const chats = require('./data/data.js');
// all the user authentication routes here
const userRoutes = require('./routes/userRoutes');
// all the chat operations here
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
// if user access unExisted path then show that 
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');


// connect to db call
connectDB();
// make instance of express variable
const app = express();
// we getting json values from frontend so need to tell server to accept that json data
app.use(express.json()); // to accept json data

// using cors  from prevent any error
app.use(cors());


// ------------- PRODUCTION CODE ------------

// Serve static files from the build directory
// app.use(express.static(path.join(__dirname, './frontend/build')));

// // Define a catch-all route that serves the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './frontend/build'));
// });

// --------------------------------------------


// WE ONLY MAKE END POINT IN SERVER.js and we elaborate in different section for readable code

//👉 app.use() general purpose routing method in Express. using for add middleware functions 
//👉 app.use() is often used for middleware functions authentication middleware 
// for routing that applies to multiple HTTP methods(GET, POST, PUT, DELETE, etc.).
// When you use app.use() the middleware or route handler specified will be executed for any HTTP method and any request path that matches the provided path prefix.

// Here is all the endpoint authenticate routes defined in userRoutes
// add middleware if two parameter then (path, functionName) 
app.use('/api/user', userRoutes);

// create a new endpoint for chat operations
app.use('/api/chat', chatRoutes);

// create new endpoint for messages
app.use('/api/message', messageRoutes)


//👉 add error handling middleware if one parameter (functionNameOnly)
// It's usually placed at the end of your route handlers to catch any unmatched requests.

//👉 This middleware is often used to handle requests for routes that do not match any of the defined routes in your application. 
app.use(notFound);

//👉 if anyone cannot handled error then It helps centralize error handling in your application.
app.use(errorHandler);


const server = app.listen(PORT, () => { console.log(`Server is started on PORT : ${PORT}`); })

// Setup socket connection
const io = require('socket.io')(server, {
    pingTimeout: 60000,//close connection if user not event
    cors: {
        origin: "https://lokeshwar-chat-app.onrender.com"
    }
});


// make event
io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    // Creating new socket for particular user setup getting data from backend
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
    })

    // someone join socket that event
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("user joined room " + room);
    })

    // typing functionality
    socket.on('typing', (room) => {
        socket.in(room).emit("typing");
    });
    socket.on('stop typing', (room) =>
    {
        socket.in(room).emit("stop typing");
    });

    // send message socket
    socket.on('new message', (newMessageReceived) => {
        console.log("New message content"+ newMessageReceived.content);
        console.log("New message sender"+ newMessageReceived.sender.name);
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user)=>{
            if(user._id == newMessageReceived.sender._id) return; // sender

            console.log("REady to send message")

            socket.in(user._id).emit("message received", newMessageReceived);
        })
    })


    // close setup socket
    socket.off('setup', () => {
        console.log('User disconnected');
        socket.leave(userData._id);
    });
})
