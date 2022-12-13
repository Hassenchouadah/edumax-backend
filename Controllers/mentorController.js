const User = require("../Models/User");
const { authenticateToken } = require("./jwtController");
const express = require("express");

const router = express.Router();


const index = (req, res, next) => {
    
    User.find({role:"mentor"})
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.json({
                message: "an error occured when displaying users"
            })
        })
}

const init = async (req, res, next) => {
    let user1 = new User({
        firstName: "Khaled",
        lastName: "Guedria",
        email: "khaled.guedria",
        avatar: "/uploads/users/49628711.jpeg",
        password:"$2a$10$CfxIr7lHVplUprPYS2xs3OvoAvVAKAzbIOe2YgyPmbllk8BrurFPi",
        phone:"55817976",
        verified:1,
        role:"mentor",
    })

    let user2 = new User({
        firstName: "fakhri",
        lastName: "Ghalleb",
        email: "fakhri.ghalleb",
        avatar: "/uploads/users/56115673.png",
        password:"$2a$10$CfxIr7lHVplUprPYS2xs3OvoAvVAKAzbIOe2YgyPmbllk8BrurFPi",
        phone:"55817976",
        verified:1,
        role:"mentor",
    })

    let user3 = new User({
        firstName: "Abdelaziz",
        lastName: "Mezri",
        email: "abdelaziz.mezri",
        avatar: "/uploads/users/1517865814980.jpeg",
        password:"$2a$10$CfxIr7lHVplUprPYS2xs3OvoAvVAKAzbIOe2YgyPmbllk8BrurFPi",
        phone:"55817976",
        verified:1,
        role:"mentor",
    })

    let user4 = new User({
        firstName: "Salma",
        lastName: "Sayah",
        email: "salma.sayah",
        avatar: "/uploads/users/1516883033056.jpeg",
        password:"$2a$10$CfxIr7lHVplUprPYS2xs3OvoAvVAKAzbIOe2YgyPmbllk8BrurFPi",
        phone:"55817976",
        verified:1,
        role:"mentor",
    })

    let user5 = new User({
        firstName: "Yassine",
        lastName: "STA",
        email: "yassine.sta",
        avatar: "/uploads/users/1625579958617.jpeg",
        password:"$2a$10$CfxIr7lHVplUprPYS2xs3OvoAvVAKAzbIOe2YgyPmbllk8BrurFPi",
        phone:"55817976",
        verified:1,
        role:"mentor",
    })
    await user1.save()
    await user2.save()
    await user3.save()
    await user4.save()
    await user5.save()

    res.status(200).send(JSON.stringify({
        status: 200,
        message: 'User Added Successfully!'
    }))
}


router.get('/',index)
//router.get('/init', init)



module.exports = router