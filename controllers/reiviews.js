const Campground = require("../models/campgrounds")
const Review = require("../models/reviews")

module.exports.createReview = async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author =req.user
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash("success","Sucessfully created review")
    res.redirect(`/campgrounds/${campground._id}`)

}

module.exports.deleteReview = async(req,res,next) => {
    const {id,reviewId} = req.params
    await Campground.findByIdAndUpdate(id,{$pull : {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Sucessfully deleted review")
    res.redirect(`/campgrounds/${id}`)
    
}