const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userDb');
const cookieParser = require('cookie-parser');
const { checkAuth } = require('./checkAuthentication');
const router = Router();

router.use(cookieParser());
const expire = 60 * 60 * 24 * 3; // 3 days

// Function for creating a token
function createToken(id) {
    return jwt.sign({ id }, 'This is the secret signature', { expiresIn: expire });
}

router.get("/", checkAuth, (req, res) => {
    // Render index.ejs from the 'views' directory
    res.render("index");
});

router.get("/login", (req, res) => {
    // Render login.ejs from the 'views' directory
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`email ${email}`);
    console.log(`password ${password}`);

    // Check the email and password using a static function in userDb file inside model folder
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id); // Generate token

        // Send the token to the browser using cookie; note that cookie expires in ms.
        res.cookie("tokenName", token, {
            maxAge: expire * 1000, // *1000 to make cookie expire in 3 days as token
            httpOnly: true, // Remove access to cookie from the console
            sameSite: 'Lax' // Improves security
        }).status(201).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: error.message });
    }
});

router.get("/register", (req, res) => {
    // Render register.ejs from the 'views' directory
    res.render("register");
});

// Handle the request received from register of the browser
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

        // Generate a token by calling the function and setting the id of user by the database
        const token = createToken(newUser._id);

        res.cookie("tokenName", token, {
            maxAge: expire * 1000, // *1000 to make cookie expire in 3 days as token
            httpOnly: true, // Remove access to cookie from the console
            sameSite: 'Lax' // Improves security
        }).status(201).json({ message: "Registration successful" });
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
