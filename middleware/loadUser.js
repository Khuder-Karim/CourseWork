/**
 * Created by Karim on 31.03.2016.
 */

var FactoryUser = require('../models/FactoryUser').Factory;
var User = require('../models/User');

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;

    if(!req.session.user) return next();

    User.getUser({_id: req.session.user}, function(err, user) {
        if(err)
            return next(err);
        if(user.length > 0) {
            req.user = res.locals.user = user[0];
        }
        next();
    });
};
