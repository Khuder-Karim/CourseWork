/**
 * Created by Karim on 02.04.2016.
 */

var mongoose = require('../libs/mongoose');
var util = require('util');
var passwordHash = require('password-hash');
var async = require('async');
var Schema = mongoose.Schema;

function Buyer() {
    //Schema.call(this, {}, {discriminatorKey: 'kind'});
    Schema.apply(this, arguments);

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
}
util.inherits(Buyer, Schema);

exports.Buyer = mongoose.model('Buyer', new Buyer());

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}
util.inherits(AuthError, Error);

AuthError.prototype.name = "AuthError";

exports.AuthError = AuthError;
exports.BuyerSchema = Buyer;
