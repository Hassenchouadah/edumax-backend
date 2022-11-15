const mongoose = require('mongoose');

const category = new mongoose.Schema({
    title: {
        type: String
    },
}, { timestamps: true })

const Category = mongoose.model('categories', category);
module.exports = Category