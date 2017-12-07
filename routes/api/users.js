var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const User = require('../../models/user.model');


/* CREATE a new User */
router.post('/users', (req, res, next) => {
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

/* GET Users */
router.get('/users', (req, res, next) => {
    User.find((err, usersList) => {
        if (err) {
            res.json(err).status(500);
            return;
        }
        res.json(usersList).status(200);
    });
});

router.get('/users/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findById(req.params.id, (err, newUser) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json(newUser);
    });
});

/* EDIT an User */
router.put('/users/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    const updates = {
        email: req.body.email,
        password: req.body.password,
        alias: req.body.alias,
        profilePic: req.body.profilePic || "",
        gender: req.body.gender,
        age: req.body.age,
        looksFor: req.body.looksFor,
        oneLiner: req.body.oneLiner,
        preference: req.body.preference
    };

    User.findByIdAndUpdate(req.params.id, updates, (err) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json({
            message: 'Profile updated successfully'
        });
    });
})

/* DELETE an User */
router.delete('/users/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.remove({ _id: req.params.id }, (err) => {
        if (err) {
            res.json(err);
            return;
        }

        return res.json({
            message: 'You account has been deleted!'
        });
    })
});

module.exports = router;