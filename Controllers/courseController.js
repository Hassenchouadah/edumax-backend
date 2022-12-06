const Course = require("../Models/Course");
const { authenticateToken } = require("./jwtController");
const express = require("express");

const router = express.Router();


const index = (req, res, next) => {
    
    Course.find()
        .populate('mentor')
        .then(courses => {
            res.json(courses)
        })
        .catch(error => {
            res.json({
                message: "an error occured when displaying Courses"
            })
        })
}

const getCourseById = (req, res, next) => {
    const { id } = req.params;

    Course.findOne({ '_id': id })
        .populate('mentor')
        .then(course => {
            res.json(course)
        })
        .catch(error => {
            res.json({
                message: "an error occured when displaying Course"
            })
        })
}


const init = async (req, res, next) => {
    let course1 = new Course({
        title: "Design Illustration",
        description: "Design illustration 3D",
        price: "45$",
        image: "/uploads/courses/1.png",
    })

    let course2 = new Course({
        title: "Design Illustration",
        description: "Design illustration 3D",
        price: "45$",
        image: "/uploads/courses/1.png",
    })

    let course3 = new Course({
        title: "Design Illustration",
        description: "Design illustration 3D",
        price: "45$",
        image: "/uploads/courses/1.png",
    })

    let course4 = new Course({
        title: "Design Illustration",
        description: "Design illustration 3D",
        price: "45$",
        image: "/uploads/courses/1.png",
    })


    await course1.save()
    await course2.save()
    await course3.save()
    await course4.save()
   

    res.status(200).send(JSON.stringify({
        status: 200,
        message: 'Course Added Successfully!'
    }))
}


router.get('/',index)
router.get('/:id',getCourseById);
//router.get('/init', init)



module.exports = router