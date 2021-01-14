/* This is authentification controller that handles authentification
logic */

const User = require('../models/User');
const { Product, Comment, Feedback } = require('../models/Product');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    let errors = { login: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
        errors.login = 'login is not avaliable';
        return errors;
    }

    // validation errors
    if (err._message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
    });
    }
    return errors;
}

var maxAgeS = 1*24*60*60;
var maxAgeMs = maxAgeS*1000;
const createToken = (id) => {
    return jwt.sign({id}, 'king of the mountain dew', {expiresIn:maxAgeS});
}

module.exports.signup_get = (req, res) => {
    res.status(200).render('signup', {title:'Signup'});
}

module.exports.signup_post = async (req, res) => {
    //Handle key-value pair from request
    const {login, password} = req.body
    try {
        const newUser = await User.create({login,password});
        const token = createToken(newUser._id);
        res.cookie('jwt', token, {maxAge: maxAgeMs, httpOnly:true});
        res.status(201).json({newUser: newUser._id});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

module.exports.login_get = (req, res) => {
    res.status(200).render('login', {title:'Login'});
}

module.exports.login_post = async (req, res) => {
    const {login, password} = req.body;
    try {
        const user = await User.login(login, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAgeMs, httpOnly: true });
        res.status(201).json({result:'success'});
    } catch (err) {
        res.status(400).json({result:'fail'});
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login');
}
