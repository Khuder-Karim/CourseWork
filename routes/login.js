/**
 * Created by Karim on 05.04.2016.
 */

var express = require('express');
var LoginRouter  = express.Router();
var User = require('../models/User');

LoginRouter.route('/')
    .get(function(req, res, next) {
        res.render('login');
    })
    .post(function(req, res, next) {
        User.authorize(req.body.username, req.body.password, function(err, user) {
            if(err) return next(err);
            req.session.user = user._id;
            res.end();
        });
    })
;

module.exports = LoginRouter;
