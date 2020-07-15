const { InvalidParams } = require('../../error/invalid-params');
const { MissingParams } = require('../../error/missing-params');
const { NotAllowed } = require('../../error/not-allowed');

class HttpCustom {
  handleErrors(error) {
    console.error(error);
    if (error instanceof InvalidParams || error instanceof MissingParams
      || error instanceof NotAllowed) {
      return {
        code: 400,
        message: error.message,
      };
    }

    return {
      code: 500,
      message: 'server error',
    };
  }
}

module.exports.httpCustom = new HttpCustom();
