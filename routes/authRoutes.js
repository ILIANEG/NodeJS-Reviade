
/* This document takes care of authentification routes */

//Get Router object from express
const { Router } = require('express');
const authController = require('../controllers/authController')

//Create router instance
const router = Router();

/* ROUTES */

//Signup form route
router.get('/signup', authController.signup_get);

//Signup form submit route
router.post('/signup', authController.signup_post);

//Login form route
router.get('/login', authController.login_get);

//login form submit route
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

//Export router
module.exports = router;