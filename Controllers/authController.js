const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const { generateAccessToken, authenticateToken } = require("./jwtController");
const express = require("express");

const router = express.Router();

const index = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.json({
                message: "an error occured when displaying users"
            })
        })
}

const login = (req, res, next) => {
    const { email, password } = req.body;


    User.findOne({ $or: [{ email: email }, { phone: email }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({ message: err })
                    }
                    if (result) {
                        const hash = { name: user._id }
                        const accessToken = generateAccessToken(hash)

                        res.status(200).send(JSON.stringify({ //200 OK
                            _id: user._id,
                            email: user.email,
                            password: user.password,
                            phone: user.phone,
                            avatar: user.avatar,
                            token: accessToken,
                        }))

                    } else {
                        res.status(201).send(JSON.stringify({ //201 incorrect password
                            message: "incorrect password"
                        }))
                    }
                })
            } else {
                res.status(202).send(JSON.stringify({ //202 user not found
                    message: "user not found"
                }))
            }
        })
}

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {

        if (err) {
            console.log('erreur password hash');
            res.json({
                message: err
            })
        }

        User.findOne({ $or: [{ email: req.body.email }] })
            .then(user => {
                if (user) {//user found
                    res.status(201).send(JSON.stringify({
                        message: 'User exist'
                    }))
                } else {//no user found
                    let user = new User({
                        email: req.body.email,
                        password: hashedPass,
                        phone: req.body.phone,
                        avatar: req.body.avatar
                    })
                    user.save().then(user => {
                        res.status(200).send(JSON.stringify({
                            message: 'User Added Successfully!'
                        }))
                    })
                        .catch(error => {
                            res.json({
                                message: "An error occured when adding user!"
                            })
                        })
                }//end else
            })//end then 
    })//end hash
}


router.get('/', authenticateToken, index)

//authentification
router.post('/login', login) //email,password
router.post('/register', register)


module.exports = router