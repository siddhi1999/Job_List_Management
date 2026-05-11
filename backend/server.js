const express = require('express');  //import express library
const cors = require('cors');  // import cors package that will be used for backend-frontend communication. 

const app = express(); // creates backend application/server. Think of app as your whole backend system

app.use(cors()); //enables CORS for all routes. Frontend from other ports can access backend.
app.use(express.json()); //this line tells express that if client send JSON data, convert it into JS format.

app.get('/', (req, res) => {    //This creates GET API route. req=Request object this contains URL, headers, body etc. res=Response object used to send ersponse back to the browser/client.
    res.send("Backend is running");   //sending response
});

app.listen((5000, () => {  //starting server on port 5000
    console.log("Server running on port 5000");  //Runs after server starts successfully
}));