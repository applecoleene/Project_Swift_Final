/*
Student IDs:  301163248
              301000645
              301172984
Webapp name: survey.js
Description: controller for survey page
*/

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
            let totals = {
                surveyCount: 0,
                preferOnline: 0,
                preferFaceToFace: 0,
                preferHybrid: 0,
                easy: 0,
                hard: 0,
                onlineYes: 0,
                f2fYes: 0,
                hybridYes: 0,
                onlineNo: 0,
                f2fNo: 0,
                hybridNo: 0,
            };

            surveyAnswers.forEach((element,index) => {
                totals.surveyCount++;
                if(element.study_meth == 'Online'){
                    totals.preferOnline++;
                }
                else if(element.study_meth == 'Face-To-Face'){
                    totals.preferFaceToFace++;
                }
                else if(element.study_meth == 'Hybrid'){
                    totals.preferHybrid++;
                }
                
                if(element.test_diff == 'Yes'){
                    totals.easy++;
                }
                else if(element.test_diff == 'No'){
                    totals.hard++;
                }

                if(element.study_meth == 'Online' && element.test_diff == 'Yes'){
                    totals.onlineYes++;
                }
                else if(element.study_meth == 'Face-To-Face' && element.test_diff == 'Yes'){
                    totals.f2fYes++;
                }
                else if(element.study_meth == 'Hybrid' && element.test_diff == 'Yes'){
                    totals.hybridYes++;
                }

                if(element.study_meth == 'Online' && element.test_diff == 'No'){
                    totals.onlineNo++;
                }
                else if(element.study_meth == 'Face-To-Face' && element.test_diff == 'No'){
                    totals.f2fNo++;
                }
                else if(element.study_meth == 'Hybrid' && element.test_diff == 'No'){
                    totals.hybridNo++;
                }
            });

            res.render('survey/list', 
            {title: 'Surveys',
            totals: totals, 
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