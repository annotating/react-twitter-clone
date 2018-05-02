require("dotenv").config();
const db = require("../models");

exports.login = async function(req, res, next) {
    try {
        if (req.session.userId) {
            let user = await db.User.findOne({ _id: req.session.userId});
            if (user) {
                let { id, username, profileImageUrl } = user;
                return res.status(200).json({
                    id, username, profileImageUrl
                });
            }
        } else {
            let user = await db.User.findOne({
                email: req.body.email
            });
            let { id, username, profileImageUrl } = user;
            let matched = await user.comparePassword(req.body.password);
            if (matched) {
                req.session.userId = id;
                return res.status(200).json({
                    id, username, profileImageUrl
                });
            } else {
                return next({
                    status: 400,
                    message: "Invalid username/password"
                });
            }
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
        req.session.userId = id;
        return res.status(200).json({
            id, username, profileImageUrl
        });
    } catch(err) {
        // mongoose code for validation fail
        if (err.code === 11000) {
            err.message = "Username or email is already taken"
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.logout =  function(req, res, next) {
    if (req.session) {
        res.clearCookie('id'); 
        // delete session object       
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.status(200).json({});
            }
        });
    }
}