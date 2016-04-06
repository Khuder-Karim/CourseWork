/**
 * Created by Karim on 31.03.2016.
 */
var express = require('express');
var UserRouter = express.Router();
var AlreadyError = require('../models/FactoryUser').AlreadyError;
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
                if(err instanceof AlreadyError) {
                    res.writeHead(302, {
                        'Content-Type': 'text/plain'
                    });
                    res.json({error: err.message});
                    return;
                } else {
                    return next(err);
                }
            }
            res.json({message: 'Added user with id: ' + user._id});
        }
    })
;

module.exports = UserRouter;