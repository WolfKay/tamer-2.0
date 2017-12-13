const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Your email is required']
    },
    password: {
        type: String,
        required: [true, 'You need a password']
    },
    alias: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["Female", "Male"],
        required: 'You need this info to socialize'
    },
    age: {
        type: Number,
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
    preference: [{
        type: String,
        required: 'Tell your friends what you are looking for!'
    }],
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
}, { timestamps: true })

userSchema.pre("save", function save(next) {
    const newUser = this;
    if (!newUser.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) { return next(err); } else {
                    newUser.password = hash;
                    return next();
                }
            });
        }
    });
});

userSchema.methods.checkPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

const User = mongoose.model('User', userSchema);


module.exports = User;