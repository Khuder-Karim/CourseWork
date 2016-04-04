/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();
var Ad = require('../models/Ad');
var async = require('async');
var Comment = require('../models/Comment');
var Buyer = require('../models/Buyer').Buyer;

AdRouter.route('/')
    .get(function(req, res, next) {
        Ad.find({}, function(err, ads) {
            if(err) return next(err);

            res.json(ads);
        })
    })
    .post(function(req, res, next) {
        Ad.create(req.body, function (err, ad) {
            if (err) return next(err);
            var id = ad._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the ad with id: ' + id);
        });
    })
;

AdRouter.route('/:adId')
    .get(function(req,res,next){
        Ad.findById(req.params.adId)
            .populate('author')
            .populate('comments')
            .exec(function(err, ad) {
                async.each(ad.comments, function(com, callback) {
                    Buyer.findById(com.author, function(err, buyer) {
                        if(err) callback(err);
                        com.author = buyer;
                        callback();
                    });
                }, function(err) {
                    res.json(ad);
                });
            })
        ;
    })
    .delete(function(req, res, next){
        Ad.findById(req.params.adId, function(err, ad) {
            if(err) return next(err);
            if(ad) {
                ad.remove(function(err) {
                    if(err) next(err);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Delete the ad with id: ' + ad._id);
                })
            } else {
                res.end(404);
            }
        });
    })
;

AdRouter.route('/:adId/comment')
    .post(function(req, res, next) {
        async.waterfall([
            function(callback) {
                Ad.findById(req.params.adId, callback);
            },
            function(ad, callback) {
                if(ad) {
                    ad.addComment(req.body, callback);
                }
            }
        ], function(err, comment) {
            if(err) return next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Comment is added. It is ' + comment.text);
        });
    });
;

module.exports = AdRouter;
