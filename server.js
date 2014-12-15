// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
	
	
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		});
 
}

// WebSocket Portion
var io = require('socket.io').listen(httpServer);


// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
	
		console.log("We have a new client: " + socket.id);
		

		socket.on('touchStarted', function(data) {
        	socket.broadcast.emit('touchStarted', data);
            console.log(data);
      });


      socket.on('touchMoved', function(data) {
            console.log(data);
        	socket.broadcast.emit('touchMoved', data);
      });


      socket.on('touchEnded', function(data) {
        socket.broadcast.emit('touchEnded', data);
        console.log("touchEnded");
      });
			
		socket.on('clientWidth', function(data){
			console.log(data);
		})
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);

