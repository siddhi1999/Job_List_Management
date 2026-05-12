const express = require('express');  //import express library
const cors = require('cors');  // import cors package that will be used for backend-frontend communication. 

const app = express(); // creates backend application/server. Think of app as your whole backend system

app.use(cors()); //enables CORS for all routes. Frontend from other ports can access backend.
app.use(express.json()); //this line tells express that if client send JSON data, convert it into JS format.

let companies = [  //using let because we'll add,delete,update company
    {
        companyName: "Hella",
        positionName: "Intern",
        status: "Interview Scheduled"
    },
    {
        companyName: "Google",
        positionName: "Werkstudent",
        status: "Applied"
    }
];


app.get('/', (req, res) => {    //This creates GET API route. req=Request object this contains URL, headers, body etc. res=Response object used to send response back to the browser/client.
    res.send("Backend is running");   //sending response
});

app.get('/companies', (req, res) => {   //request from frontend, response sent back
    res.json(companies);  //send JSON data back to frontend
});

app.post('/companies', (req, res) => {  //post is used for adding the data on the backend variable that is coming from frontend
    const newCompany = req.body;  //req.body contains data sent from frontend. This only worked becasue earlier we added app.use(express.json())
    companies.push(newCompany);   //temporary stores new compnay in backend array. Letr MOngoDB will replace this
    res.json(({message: "Company added successfully"}));
});

app.listen(5000, () => {  //starting server on port 5000
    console.log("Server running on port 5000");  //Runs after server starts successfully
});