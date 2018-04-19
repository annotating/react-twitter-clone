const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT = 10;

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

const hash = pw => {
    return bcrypt.hash(pw, 10);
}

// additional hook is needed  
// apparently calling update doesn't the trigger pre-save hook
userSchema.pre('findOneAndUpdate', async function(next) {
    let hashed = await hash(this._update.password, SALT);
    this._update.password = hashed;
    console.log('update', this._update.password);
    return next();
});

// hash password before save
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified("password")) {
            return next;
        }
        // bcrypt.hash is async
        let hashed = await hash(this.password, SALT);
        this.password = hashed;
        return next();
    } catch(err) {
        return next(err);
    }     
});

userSchema.methods.comparePassword = async function(maybePassword, next) {
    try {
        let matched = await bcrypt.compare(maybePassword, this.password);
        return matched;
    } catch(err) {
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User