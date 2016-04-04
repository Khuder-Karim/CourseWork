/**
 * Created by Karim on 04.04.2016.
 */

module.exports = function(req, res, next) {
    if(req.body.username == 'karim') {
        return next(new Error("Bad"));
    }
    next();
};
