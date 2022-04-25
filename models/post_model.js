
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    body: {type: String},
    like: {
        type: Number,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
}, {timestamps:true})
const Post = mongoose.model('Post', postSchema)
module.exports = Post;