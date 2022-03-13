const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    itemID: Number,
    isComplete: Boolean,
    text: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);