/**
 * Created by Karim on 02.04.2016.
 */

var mongoose = require('../libs/mongoose');
var util = require('util');
var passwordHash = require('password-hash');
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
}
util.inherits(Buyer, Schema);

exports.Buyer = mongoose.model('Buyer', new Buyer());
exports.BuyerSchema = Buyer;
