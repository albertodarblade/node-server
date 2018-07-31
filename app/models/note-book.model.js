const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    cost: Number,
    date: Number
});

const noteBookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    notes: [notesSchema]
});

module.exports = mongoose.model('NoteBook', noteBookSchema);