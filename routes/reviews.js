const express = require("express")
const router = express.Router({mergeParams:true})
const Campground = require("../models/campgrounds")
const Review = require("../models/reviews")
const catchAsync = require('../utils/catchAsync')
const {ValidateReview,isLoggedin,isReviewAuthor} = require("../middleware")
const reviews = require('../controllers/reiviews')




router.delete("/:reviewId",isLoggedin,isReviewAuthor, catchAsync(reviews.deleteReview))


router.post("/",isLoggedin ,ValidateReview, catchAsync(reviews.createReview))

module.exports  = router