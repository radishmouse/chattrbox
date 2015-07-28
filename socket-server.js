
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;

module.exports = function (port) {
  port = port || 3001;
  console.log('starting the websocket server at', port);
  var ws = new WebSocketServer({
    port: port
  });

  ws.on('connection', function (socket) {
    socket.on('message', function (data) {
      console.log(data);
    });
    socket.send('hay');
  });

  // We're not going to have users, will we?
  // If we do, how do we keep track of who is whom?
  // What about disconnection?
  // Is this useful for them to know?
};
