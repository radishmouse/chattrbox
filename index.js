
var http = require('http');
var fs = require('fs');
var path = require('path');
// var fileName = 'hello.txt';
var portNumber = 3000;

var socketServer = require('./socket-server');
socketServer();


var server = http.createServer(function (req, res) {
  'use strict';
  // console.log('orig url: ' + req.url);

  var url = req.url;
  if (url === '/') {
    url = 'index.html';
  }

  if (url[0] === '/') {
    url = url.substring(1);
  }

  console.log(url);
  // var filePath = path.resolve('./app' + url);
  var filePath = path.resolve(__dirname, 'app', url);
  console.log('url path: ' + filePath);

  var stream = fs.createReadStream(filePath);

  // is there something else I should use for writing the head?
  // who is doing the work of setting the status code and content-type?
  // actually, there is no content-type.
  // that header is missing...
  stream.on('readable', function () {
  // stream.on('readable', () => {

    // You can't write the head twice...
    // res.writeHead(200, {
    //   'content-type': 'text/plain'
    // });
    // Which is what happens when you want to catch errors...


    stream.pipe(res);

    /*
      By default end() is called on the destination when
      the source stream emits end, so that destination
      is no longer writable. Pass { end: false } as options
      to keep the destination stream open.
    */

    // the event is 'finish', not 'end'
    // res.on('end', function () {
    res.on('finish', function () {
      console.log('I guess it finished???');
    });


  });

  stream.on('error', function (error) {
    console.log('Caught error: ', error);
    res.writeHead(404, {
      'content-type': 'text/plain'
    });
    // we could, however read a 404.html or a 500.html file
    res.write('404 Not Found');
    res.end();
  });
});

server.listen(portNumber);
