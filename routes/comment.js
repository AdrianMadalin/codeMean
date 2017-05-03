var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware/middleware"),
    Package     = require("../models/package");

// ADD A COMMENT
router.get('/package/:id/comment/new', function(req, res) {
    Package.findById(req.params.id, function(err, foundPackage){
        if(err){
            res.redirect('back');
            console.log('there was an error finding the package in the get comment route');
        } else {
            console.log('welcome to comments/new')
                res.render('comments/new', {foundPackage : foundPackage});
        }
    })

});

// 
router.post('/package/:id',middleware.isLoggedIn, middleware.addComment, function(req,res){
    
});

module.exports = router;