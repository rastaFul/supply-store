const { QueryFailedError } = require('typeorm');
const { InvalidParams } = require('../../error/invalid-params');
const { MissingParams } = require('../../error/missing-params');
const { NotAllowed } = require('../../error/not-allowed');

class HttpCustom {
  handleErrors(error) {
    console.error(error);
    switch (error.constructor) {
      case InvalidParams:
      case MissingParams:
      case NotAllowed:
        return {
          code: 400,
          message: error.message,
        };
      case QueryFailedError:
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
          return {
            code: 400,
            message: 'Remoção não permitida, pois há transações com este registro',
          };
        }
        break;
      default:
        return {
          code: 500,
          message: 'server error',
        };
    }
  }
}

module.exports.httpCustom = new HttpCustom();
