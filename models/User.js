/**
 * Created by Karim on 06.04.2016.
 */

var async = require('async');
var Buyer = require('./Buyer').Buyer;
var Seller = require('./Seller').Seller;
var Ad = require('./Ad');
var Comment = require('./Comment');

var AuthError = require('../error/Errors').AuthError;
var UserNotFoundError = require('../error/Errors').UserNotFountError;

function User() {
    var _self = this;

    this.getUser = function(param, callback) {
        async.parallel([
            function(callback) {
                Buyer.find(param)
                    .populate('liked')
                    .exec(callback);
            },
            function(callback) {
                Seller.find(param)
                    .populate('liked')
                    .exec(callback);
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
    };

    this.setComment = function(ad, objComment, callback) {
        Ad.findById(ad, function(err, ad) {
            if(err) callback(err);
            if(ad) {
                Comment.create(objComment, function(err, comment) {
                    if(err) callback(err);
                    ad.comments.push(comment._id);
                    ad.save(function(err) {
                        if(err) callback(err);
                        callback(null, comment);
                    })
                })
            } else {
                callback(new Error(404, "Ad not found"));
            }
        });
    };

    this.subscribe = function(req, callback) {
        Ad.findById(req.params.adId, function(err, post) {
            if(err) callback(err);
            if(post) {
                req.user.liked.push(post._id);
                req.user.save(function(err) {
                    if(err) callback(err);
                    callback(null, post);
                });
            } else {
                callback(new Error(404, "Ad not found"));
            }
        })
    };

    this.unsubscribe = function(req, callback) {
        req.user.liked.forEach(function(ad, index) {
            if(ad._id == req.params.adId)
                req.user.liked.splice(index, 1);
        });
        req.user.save(callback);
    }
}

module.exports = new User();
