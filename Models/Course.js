const mongoose = require('mongoose');

const course = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
}, { timestamps: true })

const Course = mongoose.model('courses', course);
module.exports = Course