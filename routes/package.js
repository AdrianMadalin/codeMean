var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware/middleware"),
    Package     = require("../models/package");

// GET THE NEW PACKAGE FORM
router.get('/new', middleware.isLoggedIn, function(req, res){
    console.log('welcome to adding a new package');
    // console.log(currentUser);
    res.render('packages/new');
});

// HANDLE ADDING THE NEW PACKAGE 
router.post('/new',middleware.addPackage, function(req,res){
    
});

// SHOW THE PACKAGE DETAILS
router.get('/package/:id', middleware.isLoggedIn , function(req,res){
        Package.findById(req.params.id).populate('comments').exec(function(err, showPackage){
        if(err){
            console.log('there was an error');
        } else {
            res.render('packages/show', { showPackage : showPackage});
        };
    });
});

// EDIT THE PACKAGE
router.get('/package/:id/edit', function(req,res){
    Package.findById(req.params.id, function(err, foundPackage){
        if(err){
            console.log('there was an error');
        } else {
            res.render('packages/edit', { foundPackage : foundPackage});
        };
    });
});

// UPDATE THE PACKAGE
router.put('/package/:id', function(req,res){
    var newData = {
         title: req.body.title,
         shortDescription: req.body.shortDescription
    };
    
   Package.findByIdAndUpdate(req.params.id, newData, function(err, updatedPackage){
       console.log(req.body.data);
       if(err){
           console.log('there was an error updatedPackage');
           res.redirect('back');
       } else {
           res.redirect('/package/' + req.params.id);
           console.log(updatedPackage);
       }
   }); 
});

// DELETE THE PACKAGE
router.delete('/package/:id',function(req,res){
    Package.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            console.log('succesfully deleted');
            res.redirect('/');
        }
    })
});

module.exports = router;