var mongoose = require("mongoose");
    
var PackageSchema = new mongoose.Schema({
    title : String,
    shortDescription : String,
    author: {
        id : {
            type : mongoose.Schema.Types.ObjectId, 
            ref : "User"
        },
        username : String
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]
});

module.exports = mongoose.model('Package', PackageSchema);