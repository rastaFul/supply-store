class InvalidParams extends Error {
  constructor(param) {
    super();
    this.message = `invalid params [${param}]`;
  }
}

module.exports = InvalidParams;
