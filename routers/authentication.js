const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/userDb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = Router();

router.use(cookieParser());
const expire = 60*60*24*3;//3 days

//this is a function for creating a token
function createToke(id){
    /* .sign() is the method that create the jwt, note that the signature need to be secret
    this token well be expired in 3 days (jwt expire in seconds) */
    return jwt.sign({id}, 'This is the secret signature', {expiresIn: expire}); 
}


router.get("/", (req, res) => {
    // Render index.ejs from the 'views' directory
    res.render("index");
});

router.get("/login", (req, res) => {
    // Render login.ejs from the 'views' directory
    res.render("login");
});

// recieving data from the browser in login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`email ${email}`);
    console.log(`password ${password}`);

    // check the email and password using a statics function in userDb file inside model folder
    try{
        //success
        const user = await User.login(email, password);
        res.status(201).json(user._id);
    }catch(error){
        //failed
        console.log(error)
    }
    /* try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ message: "User exists and password matches" });
        } else {
            res.status(400).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } */
});

router.get("/register", (req, res) => {
    // Render register.ejs from the 'views' directory
    res.render("register");
});

//hundel the request recieve from register of the browser
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });

    try {
        // Hash the password before storing it in the database
        const hashedPass = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new User({ username, email, password: hashedPass });

        // Save the new user in the database
        await newUser.save();

        //generate a token by calling the function and setting the id of user by the database
        const token = createToke(newUser._id);

        //send the token to the browser using cookie; note that cookie expired in ms.
        res.cookie("tokenName", token,
             {maxAge: expire * 1000,//*1000 to make cookie expired in 3 days as token
              httpOnly: true,//remove the access to cookie from the console
              sameSite: 'Lax' // Improves security
             }).status(201).json({message: 'success'}); 

    } catch (error) {
        // Check for duplicate email error (MongoDB error code 11000)
        if (error.code === 11000) {
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
        console.error(error);
    }
});

module.exports = router;
