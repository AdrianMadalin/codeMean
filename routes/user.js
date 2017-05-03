var express     = require("express"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    User        = require("../models/user"),
    middleware = require("../middleware/middleware");
    
var router = express.Router();

// handle register logic
router.get('/register', function(req,res){
   res.render('register'); 
   console.log('welcome to register');
});

router.post('/register', function(req,res){

    var user = new User({username : req.body.username});
    var password = req.body.password;
   
   User.register(user, password, function(err, savedData){
       if(err){
            console.log('There was an error inserting the user in the databes');
            console.log('The error recived ' + err);
            res.redirect('back');
       } else {
            console.log(savedData.username);
            passport.authenticate("local")(req,res, function(){
                res.redirect('/');
            });
       };
    });
});

router.get('/login', function(req, res) {
    console.log('welcome to login');
    res.render('login'); 
});

// HANDLE THE LOGIN LOGIC
// var userMiddleware = passport.authenticate("local", { successRedirect : "/", failureRedirect : "/login"});

router.post("/login", passport.authenticate("local"), function(req, res){
    console.log('accessing');
    req.flash('userLogInSuccess', 'you have been logged in');
    res.redirect('/');
});

router.get('/logout', function(req, res){
    // req.logout(); comes from passport
    req.logout();
    req.flash('userLogOut','You have been logged out!');
    res.redirect('/');
});




// testing the image

var multer = require("multer");
    // upload = multer({ dest: 'public/img/' });
    
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
            cb(null, 'public/img/')
        },
    filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
});
 
var upload = multer({
 storage: storage
});


var upload = multer({ storage: storage }).single('img');

router.get('/test', (req,res) =>{
    res.render('test');
});

router.post('/test', function (req, res) {
  
  upload();
//   upload(req, res, function (err) {
//     if (err) {
//       // An error occurred when uploading
//       return
//     }
//     console.log(req.files);
    res.redirect('/');
//   })
 
  
})

module.exports = router;