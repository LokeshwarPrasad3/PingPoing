
const express = require('express');
// make instance of express variable
const app = express();
// get all env
const dotenv = require('dotenv');
// getting port no from env file
const PORT = process.env.PORT || 5000;

// require some data of chats
const chats = require('./data/data.js');


// make first server
app.get('/', (req, res) => {
    res.send("API IS RUNNING");
})

// make api to get some chats data
app.get('/api/chat', (req, res) => {
    res.send(chats);
})


// chat data get by id 
app.get('/api/chat:id', (req, res) => {
    // when passing dynamic routes then getted by params object
    // req.params is an object that holds the parameters extracted from the URL route.
    // In this case, it's used to access the value of the id parameter provided in the URL.
    console.log(req.params.id.substring(1));
    const singleChat = chats.find( (chat) => chat._id === req.params.id.substring(1));
    res.send(singleChat);
})

app.listen(PORT, () => {
    console.log(`Server is started on PORT : ${PORT}`);
})
