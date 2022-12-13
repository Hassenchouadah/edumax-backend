const express = require('express')
const cors = require('cors')
const connectDB = require('./dB/connection.js')
const morgan = require('morgan')

const app = express()


app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/uploads', express.static(__dirname + '/public'));

app.use('/api/auth', require('./Controllers/authController'))
app.use('/api/mentors', require('./Controllers/mentorController'))
app.use('/api/categories', require('./Controllers/categoryController'))
app.use('/api/promotions', require('./Controllers/promotionController'))
app.use('/api/courses', require('./Controllers/courseController'))

app.use('/api/chat',require('./Controllers/chatController'))


connectDB();
app.listen(5001, () => console.log(`app Listening on port 5001`));