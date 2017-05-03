var Package         = require("../models/package"),
    Comment         = require("../models/comment"),
    multer          = require("multer");

var middleware = {}

middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('userLogInError', 'Please login first');
        res.redirect('/login');
    };
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
            cb(null, 'public/img/')
        },
    filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
});
 
var upload = multer({ storage: storage }).single('image');

// router.post('/test', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       // An error occurred when uploading
//       return
//     }
//     console.log(req.files);
//     res.redirect('/');
//   })
 
  
// })

middleware.addPackage = function(req, res, next){
    
    // getting the data from the form
    var newPackage = { 
        title : req.body.title,
        shortDescription : req.body.description,
        author :{
                    id : req.user._id,
                    username : req.user.username
        }
    };
    
    Package.create(newPackage, function(err, newPackage){
        if(err){
            console.log('There was a problem creating the new package middleware.addPackage');
            console.log('ERROR IS ' + err);
            res.redirect('back');
        } else {
            console.log(newPackage);
            res.redirect('/');
        };
    });
    
    next();
};


middleware.findPackageById = function(req,res,next){
    Package.findById(req.params.id, function(err, foundPackage){
        if(err){
            console.log('there was an error');
        } else {
            res.render('packages/show');
        };
    });
  
  next();  
};

middleware.addComment = function(req,res,next){

    var data = {
        description : req.body.description,
        code        : req.body.code,
        author      : {
            id : req.user._id,
            username : req.user.username
        }
    };
    
    Package.findById(req.params.id, function(err, foundPackage){
        if(err){
            console.log('Error found triing to find a package in middleware.addComment');
        } else {
            Comment.create(data, function(err, createdComment){
                if(err){
                    console.log('there was an error adding the comment');
                    res.redirect('back');
                } else {
                    foundPackage.comments.push(createdComment);
                    foundPackage.save();
                    res.redirect('/package/'+ req.params.id);
                };
            });
        };
    });

    next();
}

module.exports = middleware;