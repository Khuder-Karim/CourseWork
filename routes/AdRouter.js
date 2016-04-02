/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();
var Ad = require('../models/Ad');

AdRouter.route('/')
    //.all(function(req,res,next) {
    //    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //    next();
    //})
    .get(function(req, res, next) {
        Ad.find({}, function(err, ads) {
            if(err) next(err);
            res.json(ads);
        })
    })
    .post(function(req, res, next) {
        Ad.create(req.body, function (err, ad) {
            if (err) throw err;
            console.log('Ad created!');
            var id = ad._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the ad with id: ' + id);
        });
    })
;

AdRouter.route('/:adId')
    .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.adId +' to you!');
    })
    .delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.adId);
    })
;

module.exports = AdRouter;
