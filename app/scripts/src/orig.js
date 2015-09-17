
var SS_KEY = 'x-chattrbox/u';

var username = sessionStorage.getItem(SS_KEY) || prompt('Enter a username');
sessionStorage.setItem(SS_KEY, username);
// var username = 'caquino@bignerdranch.com';
username = username.toLowerCase();

var odd = false;
var socket = new WebSocket('ws://localhost:3001');
socket.onopen = function () {
  console.log('open');

  $('#js-chat-input').submit(function(event){
    event.preventDefault();
    // I really should extract the values and pass it to `sendMessage`
    // Right now it does too much
    sendMessage();

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

  var $messageRow = $('<li>', {
    class: 'message-row'
  });
  var $message = $('<p>');

  $message.append($('<span>', {
    class: 'message-username',
    text: data.user
  }));

  $message.append($('<span>', {
    class: 'timestamp',
    'data-time': data.timestamp
  }));

  $message.append($('<span>', {
    class: 'message-message',
    text: data.message
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
    var time = $ts.attr('data-time');
    time = parseInt(time, 10);
    $ts.html(moment(time).fromNow());
  });
};

function sendMessage(msg) {
  var payload = {};
  payload.message = msg || $('#js-message-input').val();
  payload.user = username;
  payload.timestamp = (new Date()).getTime();

  socket.send(JSON.stringify(payload));

  // I should be resetting in a separate function
  $('#js-message-input').val('');
}


var howOften = 30000;
var updater = setInterval(updateTimestamps, howOften);

