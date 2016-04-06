/**
 * Created by Karim on 06.04.2016.
 */

var async = require('async');
var Buyer = require('./Buyer').Buyer;
var Seller = require('./Seller').Seller;

var AuthError = require('../error/Errors').AuthError;
var UserNotFoundError = require('../error/Errors').UserNotFountError;

function User() {
    var _self = this;

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

    this.authorize = function(username, password, callback) {
        _self.getUser({username: username}, function(err, user) {
            if(err) callback(err);
            if(user.length > 0) {
                if(user[0].checkPassword(password)) {
                    callback(null, user[0]);
                } else {
                    callback(new AuthError("Password is not correct"));
                }
            } else {
                callback(new UserNotFoundError("User not found"));
            }
        });
    }
}

module.exports = new User();
