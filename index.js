var http = require('http');
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var extract = require('./extract');
var port = 3000;
var wss = require('./websockets-server');

var handleError = function (err, res) {
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.writeHead(200, {
        'Content-Type': mime.lookup(filePath)
      });
      res.end(data);
    }
  });
});

server.listen(port);
