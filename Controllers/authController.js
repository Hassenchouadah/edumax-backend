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
                        const hash = { id: user._id }
                        const accessToken = generateAccessToken(hash)
                        
                        res.status(200).send(JSON.stringify({ //200 OK
                            status: 200,
                            message: "success",
                            user: {
                                _id: user._id,
                                email: user.email,
                                password: user.password,
                                phone: user.phone,
                                avatar: user.avatar,
                                verified:user.verified,
                                token: accessToken,
                            }
                        }))

                    } else {
                        res.status(201).send(JSON.stringify({ //201 password
                            status: 201,
                            message: "incorrect password"
                        }))


                    }
                })
            } else {
                res.status(202).send(JSON.stringify({ //200 OK
                    status: 202,
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
                    res.status(200).send(JSON.stringify({
                        status: 201,
                        message: 'User exist'
                    }))
                } else {//no user found
                    let user = new User({
                        email: req.body.email,
                        password: hashedPass,
                        phone: req.body.phone,
                        avatar: "",
                        verified: 0,
                        token:"",
                        firstName:"",
                        lastName:"",
                        role:"user"
                    })
                    user.save().then(user => {
                        res.status(200).send(JSON.stringify({
                            status: 200,
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

const sendVerificationCode = (req, res, next) => {

    var phone = req.body.phone
    var code = req.body.verificationCode
    var mailContent = `Almost done, To complete your Edumax sign up, we just need to verify your account: Please copy the code below to verify your account:` + code

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({ body: mailContent, from: phoneNumber, to: '+216' + phone })
        .then(message => res.json({ status: 200, message: 'sent' }))
        .catch(error => res.json({ status: 200, message: 'error sending' }));

}

const verifyAccount = (req, res, next) => {

    let updatedUser = {
        verified: 1
    }

    User.findOneAndUpdate({ email: req.body.email }, { $set: updatedUser })
        .then((user) => {
            const hash = { id: user._id }
            const token = generateAccessToken(hash)
            res.json({
                _id: user._id,
                email: user.email,
                password: user.password,
                phone: user.phone,
                avatar: user.avatar,
                verified: user.verified,
                token:token,
                firstName:user.firstName,
                lastName:user.lastName,
                role:user.role
            })
        })
        .catch(error => {
            res.json({
                _id: "",
                email: "",
                password: "",
                phone: "",
                avatar: "",
                verified:0,
                token:""
            })
        })
}





router.get('/', index)

//authentification
router.post('/login', login) //email,password
router.post('/register', register)

router.post('/sendVerificationCode', sendVerificationCode)
router.post('/verifyAccount', verifyAccount)



module.exports = router