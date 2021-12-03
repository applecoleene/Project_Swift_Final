var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');


router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

//displaying login Page
router.get('/login', indexController.displayLoginPage);

//processing login Page
router.post('/login', indexController.processLoginPage);

//displaying register Page
router.get('/register', indexController.displayRegisterPage);

//processing register Page
router.post('/register', indexController.processRegisterPage);

//performing the logout button
router.get('/logout', indexController.performLogout);
module.exports = router;
