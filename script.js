const express = require("express");
const bodyParser = require('body-parser');
const auth = require('./routers/authentication');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dataUrl = 'url';
const {checkUser} = require('./routers/checkAuthentication');
const route = require("./routers/Routes")
const app = express();
const port = 8080;

//view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//connect to mongoDb

mongoose.connect(dataUrl)
    .then(() => console.log('MongoDB connected'))
    .then(app.listen(port, ()=> console.log(`the app runing in port ${port}`)))
    .catch(err => console.log(err));

//routes


app.get("*", checkUser);
app.use("/", auth);
app.use("/", route);

// 404 Error Handler
app.use((req, res) => {
    res.status(404).render("404");
});