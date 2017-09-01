/*jshint browser: true, esversion: 6*/
/*global $, jQuery, alert, console, require, module, let, __dirname, io*/


$(function () {
// Connect to Socket.io server
	var socket = io();
	$('form').submit(function formSubmit() {
		socket.emit('chat message', $('#message').val());
		$('#message').val('');
		return false;
	});
	socket.on('chat message', function(name, msg){
		if (!name) {
			name = 'Anonymous';
		}
		if (!msg) {
			msg = 'None';
		}
		var newMessage = document.createElement('li');
		newMessage.innerHTML = '<h3>' + name + '</h3>' + msg;
		$('#messages').append(newMessage);
		window.scrollTo(0,document.body.scrollHeight);
	});
});