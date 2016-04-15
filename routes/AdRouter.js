/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();
var Ad = require('../models/Ad');
var async = require('async');
var fs = require('fs');
var path = require('path');
var Comment = require('../models/Comment');

var User = require('../models/User');

AdRouter.route('/')
    .get(function(req, res, next) {
        Ad.find({}, function(err, ads) {
            if(err) return next(err);
            res.json(ads);
        })
    })
    .post(function(req, res, next) {
        var obj = req.body;
        obj.author = req.user._id;
        obj.img = 'images/ad/' + req.files.file.name;
        Ad.create(obj, function(err, ad) {
            if(err) return next(err);
            res.end();
        });
    })
;

AdRouter.route('/:adId')
    .get(function(req,res,next){
        Ad.getAdDetails(req.params.adId, function(err, ad) {
            if(err) return next(err);
            res.json(ad);
        });
    })
    .delete(function(req, res, next){
        Ad.findById(req.params.adId, function(err, ad) {
            if(err) return next(err);
            if(ad) {
                async.parallel([
                    function(callback) {
                        Comment.find({
                            '_id': {$in: ad.comments}
                        }, function(err, comments) {
                            if(err) callback(err);
                            async.each(comments, function(com, callback) {
                                com.remove(callback);
                            }, callback);
                        });
                    },
                    function(callback) {
                        fs.unlink(path.join("public", ad.img), callback);
                    },
                    function(callback) {
                        User.getUser({liked: ad._id}, function(err, user) {
                            if(err) callback(err);
                            async.each(user, function(us, callback) {
                                var index = us.liked.indexOf(ad._id);
                                us.liked.splice(index, 1);
                                us.save(callback);
                            }, callback);
                        });
                    }
                ], function(err) {
                    if(err) return next(err);
                    ad.remove(function(err) {
                        if(err) return next(err);
                        res.end();
                    });
                });
            } else {
                res.status(404).send({});
            }
        });
    })
;

AdRouter.route('/:adId/comment')
    .post(function(req, res, next) {
        var obj = req.body;
        obj.author = req.user._id;
        User.setComment(req.params.adId, obj, function(err, comment) {
            if(err) return next(err);
            res.end("Ok");
        })
    })
;

AdRouter.route('/:adId/subscribe')
    .post(function(req, res, next) {
        User.subscribe(req, function(err, ad) {
            if(err) return next(err);
            res.end();
        })
    })
;

AdRouter.route('/:adId/unsubscribe')
    .post(function(req, res, next) {
        User.unsubscribe(req, function(err) {
            if(err) return next(err);
            res.end();
        });
    })
;
module.exports = AdRouter;
