import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import  connectDB from "./db/connection.js";
import Routes from "./routes/routes.js";

const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",Routes);

const PORT=5000;

connectDB();

app.listen(PORT,console.log("backend Server started at",PORT));