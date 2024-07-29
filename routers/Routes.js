const { Router } = require('express');

const route = Router();

route.get("/about", (req, res)=>{
    res.render("../views/about.ejs");
});

route.get("/blog", (req, res)=>{
    res.render("../views/blog.ejs");
});


module.exports = route;