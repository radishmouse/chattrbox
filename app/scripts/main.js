
console.log('hey there');

var username = prompt('Enter a username');
username = username.toLowerCase();

var odd = false;
var socket = new WebSocket('ws://localhost:3001');
socket.onopen = function () {
  console.log('open');
  // socket.send('test');
  // socket.close();

  $('#js-chat-input').submit(function(event){
    event.preventDefault();
    var payload = {};
    payload.message = $('#js-message-input').val();
    payload.user = username;

    // message = '[' + username + '] ' + message;

    // socket.send(JSON.stringify({'chat message': message}));
    socket.send(JSON.stringify(payload));
    $('#js-message-input').val('');

  });

};

socket.onmessage = function (e) {
  console.log('message', e.data);
  var data = JSON.parse(e.data);

  var userhash = CryptoJS.MD5(data.user);
  console.log(data.user);
  userhash = userhash.toString();

  var $img = $('<img>', {
    src: 'http://www.gravatar.com/avatar/' + userhash,
    title: data.user
  });

  var $message = $('<li>', {
    // text: msg
    text: data.message
  });
  if (odd) {
    $message.addClass('odd');
  }
  if (data.user == username) {
    $message.addClass('me');
    $message.append($img);
  } else {
    $message.prepend($img);
  }
  odd = !odd;

  $('#js-message-list').append($message);
  $message.get(0).scrollIntoView();
};

socket.onclose = function () {
  console.log('close');
};



