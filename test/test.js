var assert = require('assert');
var assert = require('assert-plus');
var clientIo = require('socket.io-client');
var io = require('socket.io').listen(8080);
var roomdata = require('../roomdata');
var socket;
var clientSocket;

describe("Socket.io", function(){
	it('Connect', function(done){
		socket = clientIo.connect('http://localhost:8080');
		io.sockets.on('connection', function (socket) {
			clientSocket = socket;
			done();
		});
	});
});
describe("Roomdata internal", function(){
	it('Join a room', function(){
		assert.doesNotThrow(function(){
			roomdata.joinRoom(clientSocket, "testroom");
		},Error);
	});
	it('Set a variable in the room', function(){
		assert.doesNotThrow(function(){
			roomdata.set(clientSocket, "gamedata","TEST"); 
		},Error);
	});
	it('Does the created variable exists?', function(){
		assert.equal(roomdata.get(clientSocket, "gamedata"),"TEST");
	});
	it('Leave a room', function(){
		assert.doesNotThrow(function(){
			roomdata.leaveRoom(clientSocket);
		},Error);
	});
});