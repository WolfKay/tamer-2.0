var express = require('express');
var router = express.Router();

const User = require('../../models/user.model');


/* CREATE a new User */
router.post('/users', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        alias: req.body.alias,
        profilePic: req.body.profilePic || '',
        gender: req.body.gender,
        age: req.body.age,
        looksFor: req.body.looksFor,
        oneLiner: req.body.oneLiner,
        preferences: req.body.preferences,
        like: req.body.like,
        dislike: req.body.dislike,
        match: req.body.match
    });

    newUser.save((err) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json({
            message: 'Your profile has been created!',
            id: newUser._id
        });
    });
});

/* GET Users */
router.get('/users', (req, res, next) => {
    User.find((err, usersList) => {
        if (err) {
            res.json(err);
            return;
        }
        res.json(usersList);
    });
});

module.exports = router;