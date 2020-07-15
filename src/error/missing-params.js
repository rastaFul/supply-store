class MissingParams extends Error {
  constructor(param) {
    super();
    this.message = `missing params [${param}]`;
  }
}

module.exports.MissingParams = MissingParams;
