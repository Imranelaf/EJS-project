const express = require("express");
const bodyParser = require('body-parser');
const auth = require('./routers/authentication');
const mongoose = require('mongoose');
const dataUrl = 'url';
const app = express();
const port = 8080;

//view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to mongoDb

mongoose.connect(dataUrl)
    .then(() => console.log('MongoDB connected'))
    .then(app.listen(port, ()=> console.log(`the app runing in port ${port}`)))
    .catch(err => console.log(err));

//routes

app.use("/", auth);


