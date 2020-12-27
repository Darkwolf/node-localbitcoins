const errors = require('./')

class UnauthorizedError extends errors.Error {
  constructor(message, code) {
    super(message || 'Unauthorized.', code || UnauthorizedError.code)
    this.setName(UnauthorizedError.name)
  }
}
UnauthorizedError.name = 'UnauthorizedError'
UnauthorizedError.code = 'unauthorized'

module.exports = UnauthorizedError
