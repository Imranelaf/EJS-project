const express = require("express");
const bodyParser = require('body-parser');
const auth = require('./routers/authentication');



const app = express();
const port = 8080;

app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", auth);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});