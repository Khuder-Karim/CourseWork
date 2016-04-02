/**
 * Created by Karim on 02.04.2016.
 */

var User = require('./User').User;
var Seller = require('./User').Seller;
var async = require('async');
var util = require('util');

function Factory() {
    this.createUser = function(userObject, callback) {
        async.waterfall([
            function(callback) {
                User.findOne({username: userObject.username}, callback);
            },
            function(foundUser, callback) {
                if(foundUser) {
                    callback(new AlreadyError("User already in database"));
                } else {
                    if(userObject.email) {
                        Seller.create(userObject, function(err, seller) {
                            if(err) throw err;
                            callback(null, seller);
                        });
                    } else {
                        User.create(userObject, function(err, user) {
                            if(err) throw err;
                            callback(null, user);
                        });
                    }
                }
            }
        ], callback);
    }
}

function AlreadyError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AlreadyError);

    this.message = message;
}
util.inherits(AlreadyError, Error);
AlreadyError.prototype.name = "AlreadyError";

exports.AlreadyError = AlreadyError;
exports.Factory = Factory;
