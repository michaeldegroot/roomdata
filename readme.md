# What it does

###### Ability to create room variables for people that use socket.io. It was kind of strange to see that there was no room variable solution for socket.io out of the box. ######


# How does it look?

	var roomdata = require('roomdata'),
	io.sockets.on('connection', function (socket) {
		// Lets join/create a room:
		roomdata.joinRoom(socket, "testroom"); // You do not have to create a room before joining it
		
		// You can define room variables:
		roomdata.set(socket, "gamedata", {x:4, y:20}); // Creates a room variable called gamedata which holds a object
		
		// Then on every socket that has joined the same room you can retrieve the values:
		console.log(roomdata.get(socket, "gamedata")); // Prints: { x: 4, y: 20 }
		console.log(roomdata.get(socket, "gamedata").y); // Prints: 20
		
		// Standard variables when a room is created:
		console.log(roomdata.get(socket, "users")); // Prints: array full of current users in room (socket.id)
		console.log(roomdata.get(socket, "room")); // Prints: current room name this socket is 
		console.log(roomdata.get(socket, "owner")); // Prints: the socket.id that created the room
		
		// Important: It is not yet possible to use get and set if a socket is in two rooms at once!
		
		// Make sure to define a on disconnect handler and call roomdata.leaveRoom with the socket as parameter or roomdata.get(socket, "users") will not function well!
		socket.on('disconnect', function() {
			roomdata.leaveRoom(socket);
		});
	});
![Example1](http://s14.postimg.org/7j43w0b81/roomdata1.png)


#  How do I use it?

## 1. Start by installing the package:
    npm install roomdata

## 2. Put this in your nodejs server file:

    var roomdata = require('roomdata');
	
## 3. Now you can do stuff like:

    roomdata.joinRoom(socket, "testroom");
	
	roomdata.set(socket, "gamedata", {x:4, y:20});
	
	console.log(roomdata.get(socket, "gamedata")); // Prints: { x: 4, y: 20 }
	console.log(roomdata.get(socket, "gamedata").y); // Prints: 20
	
## 4. Make sure to define a disconnect handler and call gamedata.leaveRoom with socket as parameter
    
    socket.on('disconnect', function() {
		roomdata.leaveRoom(socket);
	});
	
# Contact
    You can contact me at specamps@gmail.com

	
