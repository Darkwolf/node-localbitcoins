const Error = require('./Error')

class NotFoundError extends Error {
  constructor(message, code) {
    super(message || 'Not found.', code || NotFoundError.code)
    this.setName(NotFoundError.name)
  }
}
NotFoundError.name = 'NotFoundError'
NotFoundError.code = 'not-found'

module.exports = NotFoundError
