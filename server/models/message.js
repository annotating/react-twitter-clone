const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLen: 150
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

messageSchema.pre('remove', async function(next) {
    // delete from user first
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this._id);
        await user.save();
        return next();
    } catch(err) {
        return next(err);
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;