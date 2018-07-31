const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const NoteBook = require('../models/note-book.model');
const _ = require('lodash');

router.get('/', (req, res, next) => {
    NoteBook.find()
    .then((response) => {
        var noteBooks = _.map(response, item => {
            return {_id: item._id, name: item.name};
        });
        res.status(200).json(noteBooks);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

router.get('/:id', (req, res, next) => {
    NoteBook.findOne({_id: req.params.id})
    .then((response) => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

router.post('/', (req, res, next) => {
    const noteBook = new NoteBook({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    noteBook.save().then(result => {
        res.send(result);  
    })
    .catch(err => {
        res.send(err);
    });
});

router.post('/:id/notes', (req, res) => {
    NoteBook.findOne({_id: req.params.id})
    .then((record) => {
        var note = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            cost: req.body.cost,
            date: req.body.date
        };
        record.notes.unshift(note);
        record.save()
        .then(response => {
            res.status(200).json(note);
        })
        .catch( err => {
            res.status(401).send(err);
        })
    })
    .catch(err => {
        res.status(401).send(err);
    });
});

module.exports = router;