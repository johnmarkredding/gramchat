/*jshint browser: true, esversion: 6*/
/*global $, jQuery, alert, console, require, module, let, __dirname, process*/

// Require Dependencies
var express = require('express');
var hbs = require('express-handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Set port
var port = process.env.PORT || 8080;


//Set up route for static files
app.use(express.static(__dirname + '/public'));

//Set view engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');

//Render home page
app.get('/', function(req, res){
	res.render('index', {title: 'Gramchat', description: 'Real-time Socket.io and NodeJS chat app.'});
});

io.on('connection', function connectAction(socket){
	console.log('Socket connected');
	socket.on('chat message', function emitMessage(msg, name){
		if (!msg) {
			
		} else {
			io.emit('chat message', msg, name = 'Anonymous');
		}
	});
	socket.on('disconnect', function disconnectStatus(){
		console.log('Socket disconnected');
	});
});

http.listen(port, function(){
  console.log('listening on *:8080');
});