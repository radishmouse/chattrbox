
console.log('hey there');

var username = prompt('Enter a username');
// var username = 'caquino@bignerdranch.com';
username = username.toLowerCase();

var odd = false;
var socket = new WebSocket('ws://localhost:3001');
socket.onopen = function () {
  console.log('open');
  // socket.send('test');
  // socket.close();

  $('#js-chat-input').submit(function(event){
    event.preventDefault();
    sendMessage();

  });

};

function sendMessage(msg) {
  var payload = {};
  payload.message = msg || $('#js-message-input').val();
  payload.user = username;

  // message = '[' + username + '] ' + message;

  // socket.send(JSON.stringify({'chat message': message}));
  socket.send(JSON.stringify(payload));
  $('#js-message-input').val('');
}


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

  var $messageRow = $('<li>', {
    class: 'message-row'
  });
  var $message = $('<p>', {
    text: data.message
  });

  $message.append($('<span>', {
    class: 'timestamp',
    'data-time': (new Date()).getTime()
  }));

  $messageRow.append($message);


  if (odd) {
    $messageRow.addClass('odd');
  }
  if (data.user == username) {
    $messageRow.addClass('me');
    $messageRow.append($img);
  } else {
    $messageRow.prepend($img);
  }
  odd = !odd;

  $('#js-message-list').append($messageRow);
  $messageRow.get(0).scrollIntoView();
  updateTimestamps();
};

socket.onclose = function () {
  console.log('close');
};

function updateTimestamps() {
  console.log('updating timestamps...');
  $('.timestamp').each(function(idx, $ts) {
    $ts = $($ts)
    var time = $ts.attr('date-time');
    $ts.html(moment(time).fromNow());
  });
};

var updater = setInterval(updateTimestamps, 1000);

