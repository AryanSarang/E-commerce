const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("users",userSchema);