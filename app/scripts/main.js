
console.log('hey there');

var socket = new WebSocket('ws://localhost:3001');
socket.onopen = function () {
  console.log('open');
  socket.send('test');
  // socket.close();
};

socket.onmessage = function (e) {
  console.log('message', e.data);
};

socket.onclose = function () {
  console.log('close');
};
