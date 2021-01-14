const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Checks if user is authorized and redirect user to login page if not
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'king of the mountain dew', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                next();
            }
        });
    } else {
       res.redirect('/login'); 
    }
}

//Function that returns id of current user
module.exports.currentUserId = (req) => {
    const token = req.cookies.jwt;
    if (token) {
        const id = jwt.verify(token, 'king of the mountain dew', (err, decodedToken) => {
            if (err) {
                return null;
            } else {
                return decodedToken.id;
            }
        });
        if (id) {
            return id;
        } else {
            return null;
        }
    } else {
       return null; 
    }
}