const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    cost: Number,
    date: Number
});

const archiveSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Number,
    noteBookId: mongoose.Schema.Types.ObjectId,
    notes: [notesSchema]
});

module.exports = mongoose.model('Archive', archiveSchema);