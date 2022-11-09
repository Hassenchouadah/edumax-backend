const express = require('express')
const cors = require('cors')
const connectDB = require('./dB/connection.js')
const morgan = require('morgan')

const app = express()


app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use('/api/auth', require('./Controllers/authController'))


connectDB();
app.listen(5000, () => console.log(`app Listening on port 5000`));