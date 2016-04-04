/**
 * Created by Karim on 31.03.2016.
 */
var express = require('express');
var UserRouter = express.Router();
var AlreadyError = require('../models/FactoryUser').AlreadyError;
var Factory = require('../models/FactoryUser').Factory;
var Buyer = require('../models/Buyer').Buyer;

var factory = new Factory();

UserRouter.route('/')
    .get(function(req, res, next) {
        factory.getUser({}, function(err, users) {
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
                    res.end(err.message);
                    return;
                } else {
                    return next(err);
                }
            }

            var id = user._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added user with id: ' + id);
        }
    })
;

module.exports = UserRouter;