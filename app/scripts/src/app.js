import {
  USR_KEY,
  MSG_KEY,
  WS_URL,
  CHAT_FORM_ID,
  CHAT_LIST_ID,
  CHAT_INPUT_ID
} from '../config';
import socket from './ws-client';
import {UserStore, MessageStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

let userStore = new UserStore(USR_KEY);
// let messageStore = new MessageStore(MSG_KEY);

class ChatApp {
  constructor() {
    // get a username
    this.username = userStore.get();
    if (!this.username) {
      this.username = promptForUsername();

      // save it to storage
      userStore.set(this.username);
    }

    this.chatForm = new ChatForm(CHAT_FORM_ID, CHAT_INPUT_ID);
    this.chatList = new ChatList(CHAT_LIST_ID, this.username);

    // open a socket
    socket.init(WS_URL);

    // when the socket is open, it's ok to init the form
    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        // we init the form with a function that handles submit
        let message = new ChatMessage(data);
        socket.sendMessage(message.toObj());
      });
    });

    // tell the socket what to do when a message comes in
    socket.registerMessageHandler((data) => {
      // take the data, instantiate a new ChatMessage() from it
      let message = new ChatMessage(data);
      // then, call this.chatList.drawMessage() with the new message instance
      this.chatList.drawMessage(message.toObj());
    });
  }
}

class ChatMessage {
  // A chat message takes a hash, and fills in missing data
  constructor(data) {
    if (typeof data === 'string') {
      data = {
        message: data
      };
    }
    this.username = data.user || userStore.get();
    this.message = data.message;
    this.timestamp = data.timestamp || (new Date()).getTime();
  }

  // It also provides an object-literal representation
  toObj() {
    return {
      user: this.username,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
