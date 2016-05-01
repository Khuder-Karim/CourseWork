/**
 * Created by Karim on 31.03.2016.
 */
var express = require('express');
var UserRouter = express.Router();
var User = require('../models/User');

UserRouter.route('/')
    .post(function(req, res, next){
        User.create(req.body, function(err, user) {
            if(err) return next(err);
            req.session.user = user._id;
            res.end();
        });
    })
;

module.exports = UserRouter;