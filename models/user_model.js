const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'you need a name...']
    },
    email: {
        type: String,
        required: [true, 'you need an email too']
    },
    profilePic: {
        type: String,
        required: [false]
    },
    bio: {
        type: String,
        required: [false]
    },
    birthday: {
        type: Date,
        required: [true, 'must '],
        default: Date.now,
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: "Post",
    }]
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;