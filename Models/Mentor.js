const mongoose = require('mongoose');

const mentor = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
}, { timestamps: true })

const Mentor = mongoose.model('mentors', mentor);
module.exports = Mentor