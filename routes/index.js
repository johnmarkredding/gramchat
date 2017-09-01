/*jshint browser: true, esversion: 6*/
/*global $, jQuery, alert, console, require, module, let, __dirname*/

var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(4000).sockets;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

// Mongo DB URL
var mongoURL = 'mongodb://localhost:27017/chic-chat';

// Connect to our database
mongo.connect(mongoURL, function(err, db) {
	if (err) { throw err; }
	console.log('Mongo Connected!');

	// Connect to Socket.io
	client.on('connection', function(socket) {
		let chat = db.collection('chat');
		
		//Get chat data from collection
		chat.find().limit(100).sort({_id:1}).toArray(function(err, res) {
			if (err) { throw err; }
			
			// Emit Messages
			socket.emit('output', res);
		});
	});
});

// GET home page
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Chic Chat'});
});

module.exports = router;