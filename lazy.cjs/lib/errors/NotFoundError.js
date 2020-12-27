const errors = require('./')

class NotFoundError extends errors.Error {
  constructor(message, code) {
    super(message || 'Not found.', code || NotFoundError.code)
    this.setName(NotFoundError.name)
  }
}
NotFoundError.name = 'NotFoundError'
NotFoundError.code = 'not-found'

module.exports = NotFoundError
