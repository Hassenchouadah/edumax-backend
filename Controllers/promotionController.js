const Promotion = require("../Models/Promotion");
const { authenticateToken } = require("./jwtController");
const express = require("express");

const router = express.Router();


const index = (req, res, next) => {

    Promotion.find()
        .then(promotions => {
            res.json(promotions)
        })
        .catch(error => {
            res.json({
                message: "an error occured when displaying promotions"
            })
        })
}

const init = async (req, res, next) => {
    let promotion1 = new Promotion({
        title: "40% OFF",
        subtitle: "Today's Special",
        description: "get a discount for every course ordered ! Only valid for today!",
        percentage: "40%",
        image: "/uploads/mesh-706.png",
    })

    let promotion2 = new Promotion({
        title: "20% OFF",
        subtitle: "Today's Special",
        description: "get a discount for every course ordered ! Only valid for today!",
        percentage: "20%",
        image: "/uploads/mesh-234.png",
    })



    await promotion1.save()
    await promotion2.save()

    res.status(200).send(JSON.stringify({
        status: 200,
        message: 'Category Added Successfully!'
    }))
}


router.get('/', authenticateToken, index)
router.get('/init', init)



module.exports = router