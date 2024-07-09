const express = require("express");
const bodyParser = require('body-parser'); 
const auth = require('./routers/authentication');
const mongoose = require('mongoose');
const dataUrl = 'url';
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//connect to mongoDb

mongoose.connect(dataUrl)
    .then(() => console.log('MongoDB connected'))
    .then(app.listen(port, ()=> console.log(`the app runing in port ${port}`)))
    .catch(err => console.log(err));


app.use("/", auth);

app.get("/blog", (req, res) => {
    // Get the value of the clicked button
    var category = req.query.category;
    console.log(`Category: ${category}`);
    
    // Render the blog page or perform other actions
    res.render("blog", { category });
});

app.post("/submit", (req, res) => {
    const { email, name, text } = req.body;
    const data = { name, email, text };
    console.log(data);


    
    res.send(`<html> 
            <head> 
                <body>
                <h3>Thanks</h3> 
                    <script> setTimeout(() => { window.location.href = "/"; }, 2000);</script>
                </body>
            </head>
         </html>`);

    
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

