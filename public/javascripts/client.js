/*jshint browser: true, esversion: 6*/
/*global $, jQuery, alert, console, require, module, let, __dirname, io*/

//Connect to Socket.io
var socket = io.connect();

if (socket !== undefined) {
	console.log('Good connection');
}