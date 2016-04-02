/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var util = require('util');

function Comment() {
    Schema.apply(this, arguments);

    this.add({
        text: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Seller'
        },
        created: {
            type: Date,
            default: Date.now()
        }
    });
}
util.inherits(Comment, Schema);

module.exports = mongoose.model('Comment', new Comment());

