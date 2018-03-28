const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/twitter-clone", {
    keepAlive: true,
    useMongoClient: true
});