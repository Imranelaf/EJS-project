const jwt = require('jsonwebtoken');
const User = require('../model/userDb');

const checkAuth = (req, res, next) => {
    const token = req.cookies.tokenName;

    if (token) {
        jwt.verify(token, 'This is the secret signature', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

// send the info of the user to desplay name in the header
const checkUser = (req, res, next) => {
    const token = req.cookies.tokenName;

    if (token) {
        jwt.verify(token, 'This is the secret signature', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send("Error");
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(`this is user info ${user}`)
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }

};

module.exports = { checkAuth, checkUser  };
