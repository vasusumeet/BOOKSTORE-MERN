import express, { request } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";
const app=express();

app.use(cors());
app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN Tutorial');
})
app.use('/books',booksRoute);




mongoose
 .connect(mongoDBURL)
 .then(()=>{
    console.log('App is connected to Database');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
 })
 .catch((error)=>{
    console.log(error);

 })