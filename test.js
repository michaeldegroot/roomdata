var connect = require('connect'),
serveStatic = require('serve-static'),
app = connect();

app.use(serveStatic('public', {'index': 'index.html'})).listen(80);

var roomdata = require('./roomdata'),
io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
	// Lets join/create a room:
	roomdata.joinRoom(socket, "testroom"); // You do not have to create a room before joining it
	
	// You can define room variables:
	roomdata.set(socket, "gamedata", {x:4, y:20}); // Creates a room variable
	roomdata.set(socket, "timesdied", 5); // Can also be a number,string,boolean etc
	
	// Then on every socket that has joined the same room you can retrieve the values:
	console.log(roomdata.get(socket, "gamedata")); // Prints: { x: 4, y: 20 }
	console.log(roomdata.get(socket, "gamedata").y); // Prints: 20
		
		
	// Incrementing a number for example can also be done
	var inc = roomdata.get(socket, "timesdied") + 10;
	roomdata.set(socket, "timesdied", inc);
	console.log(roomdata.get(socket, "timesdied")); // Prints: 15
	
	// Standard created variables when a room is made:
	console.log(roomdata.get(socket, "users")); // Prints: array full of current users in room (socket.id)
	console.log(roomdata.get(socket, "room")); // Prints: current room name this socket is 
	console.log(roomdata.get(socket, "owner")); // Prints: the socket.id that created the room
	
	// Important: It is not yet possible to use get and set if a socket is in two rooms at once!
	
	// Make sure to define a on disconnect handler and call roomdata.leaveRoom with the socket as parameter or roomdata.get(socket, "users") will not function well!
	socket.on('disconnect', function() {
		roomdata.leaveRoom(socket);
	});
});