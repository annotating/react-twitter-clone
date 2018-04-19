const db = require("../models");

exports.getUser = async function(req, res, next) {
    console.log('getUser', req.params);
    try {
        let foundUser = await db.User.findById(req.params.id);     
        return res.status(200).json(foundUser);
    } catch(err) {
        return next(err);
    }
}

exports.updateUser = async function(req, res, next) {
    try {
        let foundUser = await db.User.findByIdAndUpdate(req.params.id, req.body, {returnNewDocument: true});     
        let { id, username, profileImageUrl } = foundUser;
        return res.status(200).json({
            id, username, profileImageUrl
        });
    } catch(err) {
        return next(err);
    }
}

exports.deleteUser = async function(req, res, next) {
    console.log('deleteUser', req.params);
    try {
        let foundUser = await db.User.findById(req.params.id);     
        return res.status(200).json(foundUser);
    } catch(err) {
        return next(err);
    }
}





