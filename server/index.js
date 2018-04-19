require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const { validateLogin, validateUser } = require("./middleware/auth");
const db = require("./models");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", validateLogin, validateUser, messagesRoutes);
app.use("/api/users/:id", validateLogin, validateUser, userRoutes);
app.get("/api/messages", validateLogin, async function(req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({createdAt: "desc"})
            .populate("user", {
                username: true,
                profileImageUrl: true
            });
        return res.status(200).json(messages);
    } catch(err) {
        return next(err);
    }
});

// if no routes above reached
app.use(function(req, res, next) {
    let error = new Error("Page Not Found");
    error.status = 404;
    next(error);
}); 

// handle remaining errors
app.use(errorHandler);

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});
