const mongoose = require('mongoose');

const promotion = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    percentage: {
        type: String
    },
    image: {
        type: String
    },
}, { timestamps: true })

const Promotion = mongoose.model('promotions', promotion);
module.exports = Promotion