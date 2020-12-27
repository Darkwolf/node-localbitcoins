const errors = require('./')

class UnknownError extends errors.Error {
  constructor(message, code) {
    super(message || 'Unknown error.', code || UnknownError.code)
    this.setName(UnknownError.name)
  }
}
UnknownError.name = 'UnknownError'
UnknownError.code = 'unknown-error'

module.exports = UnknownError
