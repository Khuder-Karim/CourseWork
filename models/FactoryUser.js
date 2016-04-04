/**
 * Created by Karim on 02.04.2016.
 */

var Buyer = require('./Buyer').Buyer;
var Seller = require('./Seller').Seller;
var async = require('async');
var util = require('util');

function Factory() {

    this.getUser = function(param, callback) {
        async.parallel([
            function(callback) {
                Buyer.find(param, callback);
            },
            function(callback) {
                Seller.find(param, callback);
            }
        ], function(err, users) {
            if(err) callback(err);
            var res = [];
            users[0].forEach(function(item) {
                res.push(item);
            });
            users[1].forEach(function(item) {
                res.push(item);
            });

            callback(null, res);
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
