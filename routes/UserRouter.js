/**
 * Created by Karim on 31.03.2016.
 */
var express = require('express');
var UserRouter = express.Router();
var AlreadyError = require('../error/Errors').AlreadyError;
var Factory = require('../models/FactoryUser');
var User = require('../models/User');
var factory = new Factory();

UserRouter.route('/')
    .get(function(req, res, next) {
        User.getUser({}, function(err, users) {
            if(err) return next(err);
            res.json(users);
        });
    })
    .post(function(req, res, next){

        factory.createUser(req.body, handler);

        function handler(err, user) {
            if(err) {
                if(err instanceof AlreadyError)
                    err.status = 302;

                return next(err);
            }
            res.end();
        }
    })
;

module.exports = UserRouter;