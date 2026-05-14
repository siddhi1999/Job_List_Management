import express from "express";
import cors from "cors";   //Cross-Origin Resource Sharing is a browser security policy that blocks frontend requests to different origins unless the backend explicitly allows them.
import companyRoutes from "./routes/companyRoutes.js";

import mongoose from "mongoose";

const app = express();   // creates backend application/server. Think of app as your whole backend system

app.use(cors());
app.use(express.json());   //this line tells express that if client send JSON data, convert it into JS format.

// /companies is the base URL. companyRoutes is the file that contains all the routers
app.use("/companies", companyRoutes);    // This line says whenever someone visits "/companies", use all the routes inside companyRoutes

//Server connection with MongoDB Atlas
mongoose.connect("mongodb+srv://siddhi:Rishmongo@job-list-cluster.crof5t6.mongodb.net/?appName=job-list-cluster")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });


app.listen(5000);