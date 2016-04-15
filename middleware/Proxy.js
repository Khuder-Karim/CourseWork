/**
 * Created by Karim on 04.04.2016.
 */

module.exports = function(req, res, next) {
    if(req.user == null) {
        return next(new Error(401));
    }
    next();
};
