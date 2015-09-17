
// i should import moment, shouldn't i?
// and I should import crypto...

export function promptForUsername() {
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formId, inputId) {
    this.formId = formId;
    this.inputId = inputId;
  }

  init(submitCallback) {
    let self = this;
    $(this.formId).submit(function(event){
      event.preventDefault();
      let val = $(self.inputId).val();
      submitCallback(val);
      // Lazy reset...
      $(self.inputId).val('');
    });
  }
}

export class ChatList {
  constructor(listId, username) {
    this.listId = listId;
    this.odd = false;
    this.username = username;

    let howOften = 30000;
    this.updater = setInterval(updateTimestamps, howOften);
  }

  drawMessage(messageData) {

    var $img = $('<img>', {
      src: createGravatarUrl(messageData.user),
      title: messageData.user
    });

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

    if (messageData.user === this.username) {
      $messageRow.addClass('me');
      $messageRow.append($img);
    } else {
      $messageRow.prepend($img);
    }
    this.odd = !this.odd;

    $(this.listId).append($messageRow);
    $messageRow.get(0).scrollIntoView();

    // immediately update timestamps
    updateTimestamps();

  }
}

function createGravatarUrl(username) {
  var userhash = CryptoJS.MD5(username);
  userhash = userhash.toString();
  return 'http://www.gravatar.com/avatar/' + userhash;
}

function updateTimestamps() {
  console.log('updating timestamps...');
  $('.timestamp').each(function(idx, $ts) {
    $ts = $($ts)
    var time = $ts.attr('data-time');
    time = parseInt(time, 10);
    $ts.html(moment(time).fromNow());
  });
};

