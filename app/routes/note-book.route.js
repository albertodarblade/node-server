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

function sendNotifications(users, body, cost) {
    const notification = {
        title: 'Agregaron una nota costo ' + cost,
        body: body,
        icon: '/images/icons/icon-72x72.png'
    }
    console.log(users, 'will send');
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
            console.log(error, response.body);
            return;
        });
    });
}

module.exports = router;