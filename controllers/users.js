const User  = require("../models/user")


module.exports.renderLogin = (req,res) => {
    res.render("users/login")
}
module.exports.renderRegister = (req,res) => {
    res.render("users/register")
}

module.exports.register = async (req,res) => {
    try{
        const {email,username,password} = req.body
        const user = new User({email,username})
        const registeredUser = await User.register(user,password)
        req.login(registeredUser,err => {
            if(err) return next(err)
            req.flash("success","Welcome to Yelpcamp")
            res.redirect("/campgrounds")
        })
       
    } catch(e) {
        req.flash("error",e.message);
        res.redirect('register')
    }
    
   // console.log(registeredUser)
  
}
module.exports.login = (req,res) => {

    req.flash("success","Welcom Back !!")
    const redirectURL = req.session.returnTo || "/campgrounds"
    delete req.session.returnTo
    res.redirect(redirectURL)
}

module.exports.logout = (req,res) => {
    req.logOut()
    req.flash("success","Good Bye !!")
    res.redirect("/campgrounds")
}