/**
 * Created by Karim on 05.04.2016.
 */

var util = require('util');

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message || 'Error';
}
util.inherits(AuthError, Error);

function UserNotFountError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, UserNotFountError);

    this.message = message || 'Error';
}
util.inherits(UserNotFountError, Error);

function AlreadyError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AlreadyError);

    this.message = message || 'Error';
}
util.inherits(AlreadyError, Error);

UserNotFountError.prototype.name = "UserNotFountError";
AuthError.prototype.name = "AuthError";
AlreadyError.prototype.name = "AlreadyError";


exports.UserNotFountError = UserNotFountError;
exports.AuthError = AuthError;
exports.AlreadyError = AlreadyError;