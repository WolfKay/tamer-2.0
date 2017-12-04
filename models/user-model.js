const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'You need a password'],
        unique: true
    },
    alias: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ["Female", "Male"],
        required: 'You need this info to socialize'
    },
    age: {
        type: Array,
        min: 18,
        max: 99,
        required: 'Show users a little bit about yourself'
    },
    looksFor: {
        type: Array,
        enum: ["Female", "Male", "Both"],
        required: 'Please tell us what you are looking for'
    },
    oneLiner: {
        type: String
    },
    preference: {
        type: Array,
        default: [],
        required: 'Tell your friends what you are looking for!'
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    match: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;