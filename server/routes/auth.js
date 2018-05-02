const express = require("express");
const router = express.Router();
const { login, signup, logout } = require("../handlers/auth");

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

module.exports = router;