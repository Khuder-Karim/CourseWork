/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();
var Ad = require('../models/Ad');
var async = require('async');

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
            res.json({message: 'Added ad with id: ' + ad._id});
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
                ad.remove(function(err) {
                    if(err) next(err);
                    res.json({message: 'Delete the ad with id: ' + ad._id});
                })
            } else {
                res.status(404).json({error: "Not found Ad"});
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
                if(ad)
                    ad.addComment(req.body, callback);
                else
                    res.status(404).json({error: "Not found Ad"});
            }
        ], function(err, comment) {
            if(err) return next(err);
            res.json({message: 'Comment is added. It is ' + comment.text});
        });
    })
;

module.exports = AdRouter;
