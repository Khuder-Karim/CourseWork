/**
 * Created by Karim on 31.03.2016.
 */

var FactoryUser = require('../models/FactoryUser').Factory;
var async = require('async');

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;

    if(!req.session.user) return next();

    (new FactoryUser).getUser({_id: req.session.user}, function(err, user) {
        if(err)
            return next(err);
        if(user) {
            req.user = res.locals.user = user;
            req.user.authorize();
        }
        next();
    });
};
