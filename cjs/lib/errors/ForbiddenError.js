const Error = require('./Error')

class ForbiddenError extends Error {
  constructor(message, code) {
    super(message || 'Forbidden.', code || ForbiddenError.code)
    this.setName(ForbiddenError.name)
  }
}
ForbiddenError.name = 'ForbiddenError'
ForbiddenError.code = 'forbidden'

module.exports = ForbiddenError
