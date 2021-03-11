const express = require("express")
const router = express.Router()

var multer  = require('multer')
const {storage} = require("../cloudinary")

var upload = multer({storage })

const catchAsync = require('../utils/catchAsync')
const campgrounds = require("../controllers/campgrounds")

const {isLoggedin,ValidateCampground,isAuthor} = require("../middleware")



router.route("/")
    .get( catchAsync(campgrounds.index))
    .post(isLoggedin,upload.array("image"),ValidateCampground, catchAsync(campgrounds.createCampground))
//    .post(upload.array("image"),(req,res) => {
//     console.log(req.body,req.files)
//     res.send("It worked")
//    }) 

router.get("/new",isLoggedin,campgrounds.rendernewForm)

router.route("/:id")
    .get( catchAsync(campgrounds.showCampground))
    .put(isLoggedin,isAuthor,upload.array("image"), ValidateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedin,isAuthor, catchAsync(campgrounds.deleteCampground))


router.get("/:id/edit",isLoggedin,isAuthor, catchAsync(campgrounds.renderEditform))








module.exports = router