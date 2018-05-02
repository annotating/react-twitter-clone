const mongoose = require("mongoose");
mongoose.set("debug", false);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/twitter-clone', {
    keepAlive: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.User = require("./user"); 
module.exports.Message = require("./message"); 