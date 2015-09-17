class Store {
  constructor(storageApi) {
    this.api = storageApi;
  }
  get() {
    return this.api.getItem(this.key);
  }

  set(value) {
    this.api.setItem(this.key, value);
  }
}

class MessageStore extends Store {
  constructor(key) {
    super(localStorage);
    this.key = key;
  }

  get() {
    let allMessages = JSON.parse(super.get());
    if (!allMessages) {
      allMessages = [];
    }
    return allMessages;
  }

  set(value) {
    super.set(JSON.stringify(value));
  }

  add(message) {
    let allMessages = this.get();
    allMessages.push(message);
    this.set(allMessages);
  }
}

class UserStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}

export default {
  UserStore: UserStore,
  MessageStore: MessageStore
}
