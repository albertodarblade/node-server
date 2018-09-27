const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const NoteBook = require('../models/note-book.model');
const _ = require('lodash');
const request = require('request');

const User = require('../models/user.model');


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
    console.log(new Date().getTime());
    console.log(req.body.date);

    console.log('-------------------------------');
    console.log(Math.floor(new Date().getTime()/ 1000));
    console.log(Math.floor(req.body.date / 1000));
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
            User.find()
            .then(response => {
                sendNotifications(response, note.name, note.cost);
            })
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

router.patch('/:id/notes/:noteId', (req, res) => {
    NoteBook.findOne({_id: req.params.id})
    .then((record) => {
        const noteId = new mongoose.Types.ObjectId(req.params.noteId);
        let note = _.find(record.notes, {_id: noteId});
        if(note) {   
            note.name = req.body.name;
            note.cost = req.body.cost;
            return record.save();   
        }
        res.send('nothing to update');
    })
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});

router.delete('/:id/notes/:noteId', (req, res) => {
    NoteBook.findOne({_id: req.params.id})
    .then((record) => {
        const noteId = new mongoose.Types.ObjectId(req.params.noteId);
        let index = _.findIndex(record.notes, {_id: noteId});
        if(index >= 0) {
            record.notes.splice(index, 1);
        }
        return record.save();
    })
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});

function sendNotifications(users, body, cost) {
    return;
    const notification = {
        title: 'Agregaron una nota costo ' + cost,
        body: body,
        icon: '/images/icons/icon-72x72.png'
    }
    users.forEach(user => {
        let message = {
            notification: notification,
            to: user.token
        }

        var clientServerOptions = {
            uri: 'https://fcm.googleapis.com/fcm/send',
            body: JSON.stringify(message),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyD6Uz8kJAnGIWnphjfDZRW9h7XpLVluXxk'
            }
        }
        request(clientServerOptions, function (error, response) {
            return;
        });
    });
}

module.exports = router;