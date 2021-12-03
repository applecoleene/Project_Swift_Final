//modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//user schema
let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Username is required'
        },
       email: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'Email Address is required'
       },
       displayName: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
       },
       created: 
       {
            type: Date,
            default: Date.now
       },
       update: 
       {
            type: Date,
            default: Date.now
       }
    },
    {
        collection: "users"
    }
);

//user model option configuration
let options = ({ missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User); //passing user model and object