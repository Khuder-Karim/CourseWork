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
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        ad: {
            type: Schema.Types.ObjectId,
            ref: 'Ad',
            require: true
        }
    });
}
util.inherits(Comment, Schema);

module.exports = mongoose.model('Comment', new Comment());

