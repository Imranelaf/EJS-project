const { Router } = require('express');


const route = Router();

// Render about.ejs from the 'views' directory
route.get("/about", (req, res)=>{
    res.render("../views/about.ejs");
});

// Render blog.ejs from the 'views' directory
route.get("/blog", (req, res)=>{
    res.render("../views/blog.ejs");
});

//Hundle with the blog created
route.post("/blog", (req, res)=>{
    //catch the information from the user
    const {category, title, content} = req.body;
    console.log(`category ${category}, title ${title}, text ${content}`)
    //send the successfull statu and message
    res.status(201).json({message : "Blog created successfully!"})
});

module.exports = route;