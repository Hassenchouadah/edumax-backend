const Mentor = require("../Models/Mentor");
const { authenticateToken } = require("./jwtController");
const express = require("express");

const router = express.Router();


const index = (req, res, next) => {
    
    Mentor.find()
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
    let user1 = new Mentor({
        firstName: "Khaled",
        lastName: "Guedria",
        email: "khaled.guedria",
        avatar: "https://avatars.githubusercontent.com/u/49628711?v=4",
    })

    let user2 = new Mentor({
        firstName: "fakhri",
        lastName: "Ghalleb",
        email: "fakhri.ghalleb",
        avatar: "https://avatars.githubusercontent.com/u/56115673?v=4",
    })

    let user3 = new Mentor({
        firstName: "Abdelaziz",
        lastName: "Mezri",
        email: "abdelaziz.mezri",
        avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQFvqBqfshBIbQ/profile-displayphoto-shrink_800_800/0/1517865814980?e=2147483647&v=beta&t=qutcJhemvLcpygyjM1PHcI03HYtXDhwNOmrpqSOxeBg",
    })

    let user4 = new Mentor({
        firstName: "Salma",
        lastName: "Sayah",
        email: "salma.sayah",
        avatar: "https://media-exp1.licdn.com/dms/image/C5103AQEvLKxe29ewzg/profile-displayphoto-shrink_200_200/0/1516883033056?e=1673481600&v=beta&t=fVK7WPr7OYtBaEg7gAqa7p0wmi3iinRQ_87YKIB7Bqk",
    })

    let user5 = new Mentor({
        firstName: "Yassine",
        lastName: "STA",
        email: "yassine.sta",
        avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQEPBwIgzBKd6Q/profile-displayphoto-shrink_800_800/0/1625579958617?e=2147483647&v=beta&t=p4OLjU1bUClNuk5ccEfTiRHQRg2qw5IIe6v-QTqFyTc",
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


router.get('/', authenticateToken,index)
//router.get('/init', init)



module.exports = router