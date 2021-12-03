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

let surveyMod = mongoose.model('surveys', surveyModel);

surveyMod.aggregate([{
    '$count': 'Surveys'
}]).exec().then((studyTotal) => {
    console.log(studyTotal);
}).catch((err) => {
    throw err;
});


surveyMod.aggregate([{
    '$match': {
        'study_meth': 'Online'
    }
}, {
    '$count': 'Online'
}]).exec().then((onlineCount) => {
    console.log(onlineCount);
}).catch((err) => {
    throw err;
});


surveyMod.aggregate([{
    '$match': {
        'study_meth': 'Face-To-Face'
    }
}, {
    '$count': 'Face-To-Face'
}]).exec().then((f2fCount) => {
    console.log(f2fCount);
}).catch((err) => {
    throw err;
});

surveyMod.aggregate([{
    '$match': {
        'study_meth': 'Hybrid'
    }
}, {
    '$count': 'Hybrid'
}]).exec().then((hybridCount) => {
    console.log(hybridCount);
}).catch((err) => {
    throw err;
});

surveyMod.aggregate([{
    '$match': {
        'test_diff': 'Yes'
    }
}, {
    '$count': 'Yes'
}]).exec().then((yesCount) => {
    console.log(yesCount);
}).catch((err) => {
    throw err;
});

surveyMod.aggregate([{
    '$match': {
        'test_diff': 'No'
    }
}, {
    '$count': 'No'
}]).exec().then((noCount) => {
    console.log(noCount);
}).catch((err) => {
    throw err;
});