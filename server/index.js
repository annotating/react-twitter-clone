require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

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
