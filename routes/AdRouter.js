/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();
var Ad = require('../models/Ad');
var async = require('async');

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
        Ad.create(obj, function (err, ad) {
            if (err) return next(err);
            //res.json({message: 'Added ad with id: ' + ad._id});
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
            res.end("Ok");
        });
    })
;

module.exports = AdRouter;
