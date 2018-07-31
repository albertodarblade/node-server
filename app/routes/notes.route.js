const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Notes = require('../models/notes.model');

router.get('/', (req, res, next) => {
});

router.post('/', (req, res, next) => {
    const notes = new Notes({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        cost: req.body.cost
    });
    notes.save().then(result => {
        res.send(result);  
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;