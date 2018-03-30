require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.validateLogin = function(req, res, next) {
    // Bearer token
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            console.log("decoded", decoded);
            if (decoded) {
                return next();
            }
        });
    } catch(err) {
        return next({
            status: 401,
            message: "Please login first"
        })
    }
};

exports.validateUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized user"
                });
            }
        });
    } catch(err) {
        return next({
            status: 401,
            message: "Unauthorized user"
        });
    }
};