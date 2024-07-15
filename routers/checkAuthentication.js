const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.tokenName;

    if (token) {
        jwt.verify(token, 'This is the secret signature', (err, decodedToken) => {
            if (err) {
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

module.exports = { checkAuth };
