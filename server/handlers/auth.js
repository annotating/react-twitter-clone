const db = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let matched = await user.comparePassword(req.body.password);
        if (matched) {
            let token = jwt.sign({ id, username, profileImageUrl }, process.env.JWT_SECRET)
            return res.status(200).json({
                id, username, profileImageUrl, token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid username/password"
            });
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid username/password"
        });
    }
    
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
        console.log(err);
        if (err.code === 11000) {
            err.message = "Username or email is already taken"
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}