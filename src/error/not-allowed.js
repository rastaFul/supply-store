class NotAllowed extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports.NotAllowed = NotAllowed;
