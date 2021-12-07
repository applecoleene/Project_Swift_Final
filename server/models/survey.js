/*
Student IDs:  301163248
              301000645
              301172984
Webapp name: survey.js
Description: creating the model for the database
*/

//instance variables
let mongoose = require('mongoose');
const db = require('../config/db');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    gender: String,
    program: String,
    study_meth: String,
    test_diff: String
}, {
    collection: "answers"
});

module.exports = mongoose.model('Survey-Answer', surveyModel);