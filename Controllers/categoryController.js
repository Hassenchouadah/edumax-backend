const Category = require("../Models/Category");
const { authenticateToken } = require("./jwtController");
const express = require("express");

const router = express.Router();


const index = (req, res, next) => {
    
    Category.find()
        .then(categories => {
            res.json(categories)
        })
        .catch(error => {
            res.json({
                message: "an error occured when displaying categories"
            })
        })
}




router.get('/', authenticateToken,index)



module.exports = router