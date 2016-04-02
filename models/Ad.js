/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var util = require('util');

function Ad() {
    Schema.apply(this, arguments);

    this.add({
        name: {
            type: String,
            require: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        top: {
            type: Boolean,
            default: false
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    });
}
util.inherits(Ad, Schema);

module.exports = mongoose.model('Ad', new Ad());


