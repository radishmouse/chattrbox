
...after all the node and npm (init) basics

# hello world

topics:

- how to `require` a module
- `http` module basics

This one is nothing more than:

```js
var http = require('http')
http.createServer(/*  <h1>hello world</h1> */);
server.listen(3000);
```

# hello file

topics:

- `fs` module basics
- stream basics (`.pipe`)

we add to the previous one

```js
var fs = require('fs');

...
fs.createReadStream().pipe
```

# error handling

topics

- status codes
- error first pattern

there's got to be a better way to do this...
currently, I'm creating the stream with `fs.createReadStream`
And then, I'm doing `stream.on('error')` and `stream.on('readable')`

The stream is just an event emitter.
And, I don't know if node just automagically writes my
status code to 200 and if it automatically calls `res.end()`

#
