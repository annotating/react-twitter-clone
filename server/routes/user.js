const express = require("express");
const router = express.Router({mergeParams: true});
const { getUser, updateUser } = require("../handlers/user");

// prefix - /api/users/
router.route("/")
    .get(getUser)
    .post(updateUser);
    // .delete(deleteUser);

module.exports = router;