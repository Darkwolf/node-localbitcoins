const errors = require('./')

class BadRequestError extends errors.Error {
  constructor(message, code) {
    super(message || 'Bad request.', code || BadRequestError.code)
    this.setName(BadRequestError.name)
  }
}
BadRequestError.name = 'BadRequestError'
BadRequestError.code = 'bad-request'

module.exports = BadRequestError
