/**
 * Created by Karim on 31.03.2016.
 */
var express = require('express');
var UserRouter = express.Router();
var AlreadyError = require('../models/FactoryUser').AlreadyError;
var Factory = require('../models/FactoryUser').Factory;


UserRouter.route('/')
    .get(function(req, res, next) {
        User.findOne({_id: '56fd8523a6eb286811ea7024'}, function(err, user) { // _id: req.session.user._id
            if(err) throw err;
            res.json(user);
        });
    })
    .post(function(req, res, next){

        var factory = new Factory();
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
            res.end('Added the' + user.kind + ' with id: ' + id);
        }
    })
;

module.exports = UserRouter;