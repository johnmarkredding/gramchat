/*jshint browser: true, esversion: 6*/
/*global $, jQuery, alert, console, require, module, let, __dirname*/

// Required modules
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var io = require('socket.io').listen(8000).sockets;
var assert = require('assert');

//Project variables
var users = [];
var connections = [];

// Mongo DB URL
//var mongoURL = 'mongodb://localhost:27017/chic-chat';

// Connect to database
/*mongo.connect(mongoURL, function(err, db) {
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
});*/


// Connect to database

// Socket.io connections
io.sockets.on('connection', function handleConnections(socket) {
	// Add new connection to array on connect
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);
	
	// Remove connection from array on disconnect
	socket.on('disconnect', function removeConnection(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnect: %s sockets connected', connections.length);
	});
});
	
	

// Get data from database

	// Send data with Socket.io

// Receive data with Socket.io

	//Put data in database



// GET home page
router.get('/', function renderRoute(req, res, next) {
	res.render('index', {title: 'Chic Chat'});
});

module.exports = router;