/**
 * Created by Karim on 05.04.2016.
 */

var express = require('express');
var LoginRouter  = express.Router();
var User = require('../models/User');
var AuthError = require('../error/Errors').AuthError;
var UserNotFoundError = require('../error/Errors').UserNotFountError;

LoginRouter.route('/')
    .post(function(req, res, next) {
        User.authorize(req.body.username, req.body.password, function(err, user) {
            if(err) {
                if(err instanceof AuthError)
                    res.status(401).json({error: err.message});
                else if(err instanceof UserNotFoundError)
                    res.status(404).json({error: err.message});
                else
                    return next(err);
            } else {
                req.session.user = user._id;
                res.json({user: req.session.user});
            }
        });
    })
;

module.exports = LoginRouter;
