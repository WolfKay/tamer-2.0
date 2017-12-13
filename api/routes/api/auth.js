var express = require('express');

var usersApi = require('./users');
const User = require('../../models/user.model');
const authRoutes = express.Router();

const passportConfig = require("../../configs/passport.config");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// register Needs login method, authentication middleware, and throw err when duplicate
authRoutes.post('/register', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        alias: req.body.alias,
        profilePic: req.body.profilePic || "",
        gender: req.body.gender,
        age: req.body.age,
        looksFor: req.body.looksFor,
        oneLiner: req.body.oneLiner,
        preference: req.body.preference
    });

    newUser.save((err) => {
        if (err) {
            res.json(err);
            return;

        } else {
            res.json({
                message: "New profile created, welcome to network",
                id: newUser._id
            })
        };
    })
});


//login not working
authRoutes.post('/login', function(req, res, next) {
    console.log("debugger");
    passport.authenticate('local', (err, user, message) => {
        req.login(user, function(err) {
            if (err) { return next(err); }
            // return res.redirect('/users' + req.user.username);
        })
    });
    next();
})



//logout
module.exports.Logout = (req, res, next) => {
    req.logout();
    req.session.destroy(function(err) {
        if (err) { return next(err); }
        return res.status(204).send();
    });
};

module.exports = authRoutes;