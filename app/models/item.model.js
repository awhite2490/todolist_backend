const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    isComplete: Boolean,
    text: String,
    dueDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);