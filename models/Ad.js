/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var util = require('util');
var Comment = require('./Comment');
var async = require('async');

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
        img: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            require: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        created: {
            type: Date,
            default: Date.now()
        }
    });

    this.statics.getAdDetails = function(idAd, callback) {
        var Ad = this;

        Ad.findById(idAd)
            .populate('author')
            .populate('comments')
            .exec(function(err, ad) {
                if(!ad) {
                    callback(null, ad);
                    return;
                }
                async.each(ad.comments, function(com, callback) {
                    require('./User').getUser({_id: com.author}, function(err, user) {
                        if(err) callback(err);
                        com.author = user[0];
                        com.author['liked'] = undefined;
                        com.author['hashedPassword'] = undefined;
                        callback();
                    })
                }, function(err) {
                    if(err) callback(err);
                    callback(null, ad);
                });
            });
    };
}
util.inherits(Ad, Schema);

module.exports = mongoose.model('Ad', new Ad());


