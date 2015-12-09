var assert = require('assert');
var assert = require('assert-plus');
var clientIo = require('socket.io-client');
var io = require('socket.io').listen(8080);
var roomdata = require('../roomdata');
var socket;
var clientSocket;

roomdata.Debug = true;

describe("Socket.io", function(){
	it('Connect', function(done){
		socket = clientIo.connect('http://localhost:8080');
		io.sockets.on('connection', function (socket) {
			clientSocket = socket;
			done();
		});
	});
});
describe("Internal", function(){
	it('Set a variable while not in a room', function(){
		assert.equal(roomdata.set(clientSocket, "gamedata","TEST"),false);
	});
	it('Get a variable while not in a room', function(){
		assert.equal(roomdata.get(clientSocket, "gamedata","TEST"),undefined);
	});
	it('Get room of room while not in a room', function(){
		assert.equal(roomdata.get(clientSocket, "room"),undefined);
	});
	it('Leave a room while not in one', function(){
		assert.throws(function(){
			roomdata.leaveRoom(clientSocket);
		},Error);
	});
	it('Join a room', function(){
		assert.doesNotThrow(function(){
			roomdata.joinRoom(clientSocket, "testroom");
		},Error);
	});
	it('Get room of room', function(){
		assert.equal(roomdata.get(clientSocket, "room"),"testroom");
	});
	it('Get owner of room', function(){
		assert.equal(roomdata.get(clientSocket, "owner").length,20);
	});
	it('Get users of room', function(){
		assert.object(roomdata.get(clientSocket, "users"));
	});
	it('Set a variable in the room', function(){
		assert.doesNotThrow(function(){
			roomdata.set(clientSocket, "gamedata","TEST"); 
		},Error);
	});
	it('Does the created variable exists?', function(){
		assert.equal(roomdata.get(clientSocket, "gamedata"),"TEST");
	});
	it('Join a room while in a room already', function(){
		assert.doesNotThrow(function(){
			roomdata.joinRoom(clientSocket, "testroom2");
		},Error);
	});
	it('Leave a room', function(){
		assert.doesNotThrow(function(){
			roomdata.leaveRoom(clientSocket);
		},Error);
	});
});