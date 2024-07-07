// models/post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // Add more fields as needed
});

module.exports = mongoose.model('Post', postSchema);