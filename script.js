const express = require("express");
const app = express();
const bodyParser = require('body-parser'); 
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");

// Serve static files from the 'static' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // Render index.ejs from the 'views' directory
    res.render("index.ejs");
    
    
});

app.get("/blog", (req, res) => {
    // Get the value of the clicked button
    const category = req.query.category;
    console.log(`Category: ${category}`);
    // Render the blog page or perform other actions
    res.render("blog.ejs");
   
    
});

app.get("/submit", (req, res)=>{
    const email = req.query.email;
    const name = req.query.name;
    const text = req.query.text;
    console.log(email);
    console.log(name);
    res.send("Thanks");
        
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
   
    
});


app.listen(port, () => {
    console.log("Server is running on port 3000");
});
