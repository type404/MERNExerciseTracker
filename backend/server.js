const express = require("express");
const cors = require("cors");
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const mongoose = require("mongoose"); //to connect to our mongoDB database

//for our environment variables
require("dotenv").config({ path: ".env" });

//to create express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //allows us to parse json because server sending and receiving JSON

//the URI is where our database is stored
const uri = process.env.ATLAS_URI;
//the flags are to deal with the updates in MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`MongoDB database connection established successfully`);
});

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

//starts the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
