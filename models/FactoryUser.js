/**
 * Created by Karim on 02.04.2016.
 */

var Buyer = require('./Buyer').Buyer;
var Seller = require('./Seller').Seller;
var async = require('async');
var util = require('util');

function Factory() {

    this.getUser = function(param, callback) {
        async.waterfall([
            function(callback) {
                Buyer.find(param, callback);
            },
            function(foundUsers, callback) {
                if(foundUsers.length > 0) {
                    callback(null, foundUsers);
                } else {
                    Seller.find(param, callback);
                }
            }
        ], function(err, foundUsers) {
            if(err) callback(err);
            callback(null, foundUsers);
        });
    };

    var _self = this;

    this.createUser = function(userObject, callback) {
        _self.getUser({username: userObject.username}, function(err, users) {
            if(err) throw err;
            if(users.length > 0) {
                callback(new AlreadyError("User already in database"));
            } else {
                if(userObject.email) {
                    Seller.create(userObject, callback);
                } else {
                    Buyer.create(userObject, callback);
                }
            }
        });
    };
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
