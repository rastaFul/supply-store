const { QueryFailedError } = require('typeorm');
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

    if (error instanceof QueryFailedError) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return {
          code: 400,
          message: 'Remoção não permitida, pois há transações com este registro',
        };
      }
    }

    return {
      code: 500,
      message: 'server error',
    };
  }
}

module.exports.httpCustom = new HttpCustom();
