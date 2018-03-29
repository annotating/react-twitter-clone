const db = require("../models");
const jwt = require("jsonwebtoken");

exports.login = function() {

}

exports.signup = async function(req, res, next) {
    try {
        let newUser = await db.User.create(req.body);
        let {id, username, profileImageUrl} = newUser;
        let token = jwt.sign({id, username, profileImageUrl}, process.env.JWT_SECRET);
        return res.status(200).json({
            id, username, profileImageUrl, token
        });
    } catch(err) {
        // mongoose code for validation fail
        if (err.code === 1100) {
            err.message = "Username or email already taken"
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}