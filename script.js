const express = require("express");
const bodyParser = require('body-parser'); 
const app = express();
const port = 5000;

app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // Render index.ejs from the 'views' directory
    res.render("index");
});

app.get("/blog", (req, res) => {
    // Get the value of the clicked button
    const category = req.query.category;
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

