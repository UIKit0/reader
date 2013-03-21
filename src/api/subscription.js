var express = require('express'),
    Validator = require('validator').Validator,
    db = require('../db'),
    utils = require('../utils'),
    feeder = require('../feeder/feeder');
    
var app = module.exports = express();

// prevent validator from throwing errors, and instead return false on error
// FIXME: there has to be a better way to do this
var validator = new Validator;
validator.error = function() { return false; }

app.post('/reader/api/0/subscription/edit', function(req, res) {
    if (!utils.checkAuth(req, res, true))
        return;
        
    var url = /^feed\//.test(req.body.s) && req.body.s.slice(5);
    if (!validator.check(url).isUrl())
        return res.send(400, 'Error=InvalidStream');
        
    var addTags = utils.parseTags(req.body.a, req.user.id);
    if (req.body.a && !addTags)
        return res.send(400, 'Error=InvalidTag');
        
    var removeTags = utils.parseTags(req.body.r, req.user.id);
    if (req.body.r && !removeTags)
        return res.send(400, 'Error=InvalidTag');
        
    switch (req.body.ac) {
        case 'subscribe':
            // 1. Find or add a Feed for this URL
            // 2. Find or add a Subscription for the feed
            // 3. Increment feed.numSubscribers if a subscription is added
            // 4. Add/remove tags and update title (see edit action)
        
        case 'unsubscribe':
            // 1. Find a Feed for this URL
            // 2. Delete Subscription for this feed
            // 3. Decrement feed.numSubscribers
            // 4. If feed.numSubscribers is 0, delete feed
        
        case 'edit':
            // 1. Find a Feed for this URL
            // 2. Find Subscription for this URL
            // 3. Update subscription.title if needed
            // 4. Add/remove tags and add them to subscription
        
        default:
            return res.send(400, 'Error=UnknownAction');
    }
    
    res.send('OK');
});

app.get('/reader/api/0/subscription/list', function(req, res) {
    
});

app.get('/reader/api/0/subscription/export', function(req, res) {
    
});

app.get('/reader/api/0/subscribed', function(req, res) {
    
});