let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyAnswers) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/list', 
            {title: 'Surveys', 
            SurveyList: surveyAnswers, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "gender": req.body.gender,
        "program": req.body.program,
        "study_meth": req.body.study_meth,
        "test_diff": req.body.test_diff
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "gender": req.body.gender,
        "program": req.body.program,
        "study_meth": req.body.study_meth,
        "test_diff": req.body.test_diff
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the survey list
             res.redirect('/survey-list');
        }
    });
}