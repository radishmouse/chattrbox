
# npm basics

what

## npm init

...after all the node and npm (init) basics

## npm scripts

```bash
npm start
```


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
- `__dirname`

we add to the previous one
but we introduce streams.
in node (and in UNIX programming) a stream is a sequence of
data. (is that right? what's a better way to express this?)

for example, let's say you wanted to read an `index.html` file
from the hard drive and send it in a response back to the browser.
in node, you open a stream. on one end is the file, bit by bit (literally)
it reads the information from the file. at the other end of the stream,
you have programmatic access to the file's contents.

So, you take the other end of the stream and you pour its contents
into the response that will be sent back to the browser.

it's like siphoning gas
or maybe like a slinky (or maybe not like a slinky)

## notes about streams

You can .push all you want before you .pipe.
This is because when you .push() to a readable stream, the chunks you push are buffered until a consumer is ready to read them.

When you .pipe from a readable stream to a writable stream,
once the readable stream is consumed entirely, the writeable stream's
.end method is called automatically.

---

```js
var fs = require('fs');

...
fs.createReadStream().pipe
```

You can pipe any sort of a

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

ok, so some http status code basics
maybe let's do chart here with things like 200, 404, and 500
there's also 304 others.

when we handle a file that isn't there (like the favicon.ico)
we set the status code to 404 and we send back an error message.

## challenges

### bronze challenge

### silver challenge

you can write plain text or you can read a 404.html file from the hard drive.
(or maybe this is a sliver challenge. yes. sliver.)
but, we won't be handling error 500 because we're not doing anything that
complicated right?

### gold challenge
