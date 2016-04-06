/**
 * Created by Karim on 02.04.2016.
 */

var Buyer = require('./Buyer').Buyer;
var Seller = require('./Seller').Seller;
var User = require('./User');
var AlreadyError = require('../error/Errors').AlreadyError;

function Factory() {
    this.createUser = function(userObject, callback) { // Фабричный метод
        User.getUser({username: userObject.username}, function(err, users) {
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

module.exports = Factory;
