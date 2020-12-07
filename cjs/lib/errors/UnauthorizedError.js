const Error = require('./Error')

class UnauthorizedError extends Error {
  constructor(message, code) {
    super(message || 'Unauthorized.', code || UnauthorizedError.code)
    this.setName(UnauthorizedError.name)
  }
}
UnauthorizedError.name = 'UnauthorizedError'
UnauthorizedError.code = 'unauthorized'

module.exports = UnauthorizedError
