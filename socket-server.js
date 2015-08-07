
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var Guid = require('guid');

module.exports = function (port) {
  port = port || 3001;
  console.log('starting the websocket server at', port);
  var ws = new WebSocketServer({
    port: port
  });

  ws.on('connection', function (socket) {

    // give it an id
    // var guid = Guid.create();
    // socket.send(JSON.stringify({'clientId': guid.value}));
    // clients[guid.value] = socket;


    socket.on('message', function (data) {
      console.log('here be a message');
      console.log(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
      // socket.send(data);
    });

    socket.on('close', function() {
      console.log(arguments);
    })


  });


  // We're not going to have users, will we?
  // If we do, how do we keep track of who is whom?
  // What about disconnection?
  // Is this useful for them to know?
};
