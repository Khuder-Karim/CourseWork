/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var util = require('util');
var Comment = require('./Comment');
var factoryUser = require('./FactoryUser').Factory;
var async = require('async');

var factory = new factoryUser();

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
                    factory.getUser({_id: com.author}, function(err, user) {
                        if(err) callback(err);
                        com.author = user[0];

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


