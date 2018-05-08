/*jshint browser: true, esversion: 6*/
/*global $, jQuery, alert, console, require, module, __dirname, process*/

// Require Dependencies
let express = require('express');
let hbs = require('express-handlebars');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// Set port
let port = process.env.PORT || 8080;


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

http.listen(port, () => {
  console.log('listening on *:8080');
});