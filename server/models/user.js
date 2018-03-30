const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

// hash password before save
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified("password")) {
            return next;
        }
        // bcrypt.hash is async
        let hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch(err) {
        return next(err);
    }     
});

userSchema.methods.comparePassword = async function(maybePassword, next) {
    try {
        console.log(maybePassword, this.password);
        let matched = await bcrypt.compare(maybePassword, this.password);
        return matched;
    } catch(err) {
        console.log('error', err);
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User