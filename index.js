const express = require('express')
const cors = require('cors')
const connectDB = require('./dB/connection.js')
const morgan = require('morgan')

const SocketServer = require('websocket').server
const http = require('http')
const { addMessage } = require('./Controllers/socketController.js')

const app = express()
const server = http.createServer((req, res) => {})

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





server.listen(5002, () => console.log(`socket Listening on port 5002`))
wsServer = new SocketServer({httpServer:server})

const connections = []

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.on('message', (mes) => {

        connections.forEach(async element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
            console.log("message received :",mes.utf8Data)
            await addMessage(mes.utf8Data)
        })
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})
