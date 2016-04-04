/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var util = require('util');
var Comment = require('./Comment');

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
            ref: 'Seller'
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    });

    this.methods.addComment = function(objectComment, callback) {
        var ad = this;
        Comment.create(objectComment, function(err, comment) {
            if(err) callback(err);
            ad.comments.push(comment._id);
            ad.save(function(err) {
                if(err) callback(err);
                callback(null, comment);
            });
        })
    };
}
util.inherits(Ad, Schema);

module.exports = mongoose.model('Ad', new Ad());


