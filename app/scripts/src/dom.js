
// i should import moment, shouldn't i?
// and I should import crypto...

// let $ = require('jquery'); // adds 665k
let moment = require('moment'); // adds 233k
// let md5 = require('crypto-js/md5'); // adds 81k, 532k if you include the whole thing and not just md5

let $ = require('jquery');
let md5 = require('crypto-js/md5');

function createGravatarUrl(username) {
  let userhash = md5(username);
  userhash = userhash.toString();
  return `http://www.gravatar.com/avatar/${userhash}`;
}

export function promptForUsername() {
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

function updateTimestamps() {
  console.log('updating timestamps...');
  $('.timestamp').each((idx, $ts) => {
    $ts = $($ts)
    var time = $ts.attr('data-time');
    time = parseInt(time, 10);
    $ts.html(moment(time).fromNow());
  });
};

export class ChatForm {
  constructor(formId, inputId) {
    this.formId = formId;
    this.inputId = inputId;
  }

  init(submitCallback) {
    // let self = this;
    $(this.formId).find('button').on('click', () => {
      $(this.formId).submit();
    });
    $(this.formId).on('submit', (event) =>{
      event.preventDefault();
      let val = $(this.inputId).val();
      submitCallback(val);
      // Lazy reset...
      $(this.inputId).val('');
    });
  }
}

export class ChatList {
  constructor(listId, username, updateFrequency=30000) {
    this.listId = listId;
    this.odd = false;
    this.username = username;

    this.updater = setInterval(updateTimestamps, updateFrequency);
  }

  drawMessage(messageData) {

    var $messageRow = $('<li>', {
      class: 'message-row'
    });
    var $message = $('<p>');

    $message.append($('<span>', {
      class: 'message-username',
      text: messageData.user
    }));

    $message.append($('<span>', {
      class: 'timestamp',
      'data-time': messageData.timestamp
    }));

    $message.append($('<span>', {
      class: 'message-message',
      text: messageData.message
    }));

    $messageRow.append($message);


    if (this.odd) {
      $messageRow.addClass('odd');
    }

    var $img = $('<img>', {
      src: createGravatarUrl(messageData.user),
      title: messageData.user
    });

    if (messageData.user === this.username) {
      $messageRow.addClass('me');
      $messageRow.append($img);
    } else {
      $messageRow.prepend($img);
    }
    this.odd = !this.odd;

    $messageRow.hide();
    $(this.listId).append($messageRow);

    let useEffects = messageData.timestamp > (new Date()).getTime() - 5000
    if (useEffects) {
      $messageRow.fadeIn();
    } else {
      $messageRow.show();
    }
    $messageRow.get(0).scrollIntoView();

    // immediately update timestamps
    updateTimestamps();

  }
}

