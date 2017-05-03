module.exports = 

    function(req, res, next){
        // whatever we put in res.locals it's wat's avalabile inside of our template
        res.locals.currentUser      = req.user;
        res.locals.userLogInError   = req.flash("userLogInError");
        res.locals.userLogInSuccess = req.flash("userLogInSuccess");
        res.locals.userLogOut       = req.flash("userLogOut");
        next();
    };