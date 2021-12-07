/*
Student IDs:  301163248
              301000645
              301172984
Webapp name: index.js
Description: controller for index page
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//user model instance
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

//showing the login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/login');
    }
}

//processing the login page
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if(err) //if there's an error
        {
            return next(err);
        }
        if(!user) //if there's a user login error
        {
            req.flash('loginMessage', 'Please enter correct username and password.');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err)
            {
                return next(err);
            }
            return res.redirect('/survey-list');
        });
    })(req, res, next);
}

//showing the display page
module.exports.displayRegisterPage = (req, res, next) => {
    //login status
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/survey-list');
    }
}

//processing the register page
module.exports.processRegisterPage = (req, res, next) => {
    //create an object for the user
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //redirect and authenticate user if there is no error
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/survey-list')
            });
        }
    });
}

//performing the loging out process
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

