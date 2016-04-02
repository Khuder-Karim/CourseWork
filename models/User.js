/**
 * Created by Karim on 30.03.2016.
 */

var mongoose = require('../libs/mongoose');
var util = require('util');
var passwordHash = require('password-hash');
var async = require('async');
var Ad = require('./Ad.js');
var Schema = mongoose.Schema;

function User() {
    Schema.call(this, {}, {discriminatorKey: 'kind'});

    this.add({
        username: {
            type: String,
            required: true,
            unique: true
        },
        hashedPassword: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now()
        }
    });

    this.virtual('password')
        .set(function(password) {
            this.hashedPassword = passwordHash.generate(password, {
                iteration: 10000
            });
        })
        .get(function() {
            return this.hashedPassword;
        })
    ;

    this.methods.checkPassword = function(password) {
        return passwordHash.verify(password, this.hashedPassword);
    };

    this.statics.authorize = function(username, password, callback) {
        var User = this;

        async.waterfall([
            function(callback) {
                User.findOne({username: username}, callback);
            },
            function(user, callback) {
                if(user) {
                    if(user.checkPassword(password)) {
                        callback(null, user);
                    } else {
                        callback(new AuthError("Пароль не верен"));
                    }
                } else {
                    callback(new Error("User not found"));
                }
            }
        ], callback);
    };

    this.statics.registration = function(username, password, callback) {
        var User = this;

        var us = new User({username: username, password: password});

        us.save(function(err) {
            if(err) return callback(err);
            callback(null, us);
        });
    };
}
util.inherits(User, Schema);


// Decorator User ----------

function Seller() {
    User.call(this);
    var us = new User();

    this.add({
        email: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    });

    this.statics.registration = function(username, password, firstName,
                                         secondName, email, phoneNumber, callback) {
        var Seller = this;
        var seller = new Seller({username: username, password: password,
            firstName: firstName, lastName: secondName, email: email, phoneNumber: phoneNumber});

        seller.save(function(err) {
            if(err) return callback(err);
            callback(null, seller);
        })
    };

    this.method.addAd = function(adObject) {
        var ad = new Ad(adObject);

    }
}
util.inherits(Seller, Schema);

var us = mongoose.model('User', new User());
var seller = us.discriminator('Seller', new Seller());


exports.User = us;
exports.Seller = seller;

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}
util.inherits(AuthError, Error);

AuthError.prototype.name = "AuthError";

exports.AuthError = AuthError;





