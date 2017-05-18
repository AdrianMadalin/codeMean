var express = require("express"),
    User    = require("../models/user");
    Package = require("../models/package");
    
var router = express.Router();

router.get('/', function(req, res){
    Package.find({},function(err, foundPackage){
        if(err){
            console.log('error retriving the package');
            res.redirect('back');
        } else {
            res.render('index', {foundPackage : foundPackage});          
        };
    });
});

module.exports = router;