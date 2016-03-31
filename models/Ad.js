/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var util = require('util');

function Ad() {
    Schema.apply(this, arguments);

    this.add({
        header: {
            type: String,
            require: true
        },
        body: {
            type: String
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        price: {
            type: Number,
            require: true
        }
    });
}
util.inherits(Ad, Schema);

module.exports = mongoose.model('Ad', new Ad());


