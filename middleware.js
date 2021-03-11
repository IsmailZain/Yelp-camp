const Campground = require("./models/campgrounds")
const Review = require("./models/reviews")
const {campgroundSchema,reviewSchema} = require("./schemas")
const ExpressError = require("./utils/ExpressError")



module.exports.isLoggedin =  (req,res,next) => {
    if(!req.isAuthenticated())
    {
        req.session.returnTo = req.originalUrl
      
        req.flash("error","You need to login first")
        return res.redirect("/login")
    }
    next()
}

module.exports.ValidateCampground = (req, res, next) => {
   
    const result = campgroundSchema.validate(req.body)
    const { error } = result
    if (error) {
        const msg = error.details.map(el => el.message).join(".")
        throw new ExpressError(msg, 400)
    }
    else next()
}

module.exports.isAuthor = async (req,res,next) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id))
    {
        req.flash("error","You dont have permissions to do this")
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.isReviewAuthor = async (req,res,next) => {
    const {id,reviewId} = req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id))
    {
        req.flash("error","You dont have permissions to do this")
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.ValidateReview = (req, res, next) => {

    const result = reviewSchema.validate(req.body)
    const { error } = result
    if (error) {
        const msg = error.details.map(el => el.message).join(".")
        throw new ExpressError(msg, 400)
    }
    else next()
}

