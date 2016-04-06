/**
 * Created by Karim on 02.04.2016.
 */
var Buyer = require('./Buyer').BuyerSchema;
var mongoose = require('../libs/mongoose');
var util = require('util');
// Decorator Buyer

function DecoratorBuyer() {
    Buyer.apply(this, arguments);

    this.add({
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        }
    });
}
util.inherits(DecoratorBuyer, mongoose.Schema);

exports.Seller = mongoose.model('Seller', new DecoratorBuyer());
