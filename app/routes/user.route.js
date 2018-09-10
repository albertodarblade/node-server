const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const _ = require('lodash');

router.get('/', (req, res, next) => {
});

router.get('/:id', (req, res, next) => {
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        token: req.body.token
    });

    User.findOne({token: req.body.token})
    .then(response => {
        if(response) {
            res.send(response);
        } else {
            user.save().then(result => {
                res.send(result);  
            })
            .catch(err => {
                res.send(err);
            });
        }
    })
    .catch(error => {
        console.log('error', error);
        res.send(error);
    })
});


module.exports = router;