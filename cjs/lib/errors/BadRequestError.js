const Error = require('./Error')

class BadRequestError extends Error {
  constructor(message, code) {
    super(message || 'Bad request.', code || BadRequestError.code)
    this.setName(BadRequestError.name)
  }
}
BadRequestError.name = 'BadRequestError'
BadRequestError.code = 'bad-request'

module.exports = BadRequestError
