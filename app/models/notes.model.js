const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    cost: Number
});

module.exports = mongoose.model('Notes', notesSchema);