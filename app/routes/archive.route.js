const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Archive = require('../models/archive.model');
const NoteBook = require('../models/note-book.model');

const _ = require('lodash');

router.get('/:id', (req, res, next) => {
    const noteBookId = new mongoose.Types.ObjectId(req.params.id)
    Archive.find({noteBookId: noteBookId})
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

router.post('/', (req, res, next) => {
    const archive = new Archive({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        noteBookId: req.body.noteBookId
    });

    NoteBook.findOne({_id: req.body.noteBookId})
    .then(response => {
        if(!response.notes.length) {
            return new Promise((resolve, reject) => {
                reject('No existen notas que archivar');
            }); 
        }
        archive.notes = response.notes;
        response.notes = [];
        const promises = [];
        promises.push(archive.save());
        promises.push(response.save());
        return Promise.all(promises);
    })
    .then(response => {
        res.status(200).send({});
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

module.exports = router;